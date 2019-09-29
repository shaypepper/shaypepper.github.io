def preprocess_sentences(filename):
    with open(f'original_data/{filename}.txt' , 'r') as original_text, open(f'preprocessed_data/{filename}.txt' , 'w') as  altered_text, open(f'vocabulary/{filename}.py', 'w') as  vocabulary:
        token_lists = []
        unique_words = {'<unk>': 0}
        for line in original_text:
            processed_line = line.lower().strip('\n')
            token_list = []
            for token in processed_line.split():
                if token not in unique_words:
                    token_list.append(f'<first>{token}')
                    unique_words[token] = 1
                else: 
                    token_list.append(token)
                    unique_words[token] += 1
            token_lists.append(token_list)
        
        for token_list in token_lists:
            for i, token in enumerate(token_list):
                if "<first>" in token:
                    original_token = token.replace("<first>", "")
                    if unique_words[original_token] > 1:
                        token_list[i] = original_token
                    else:
                        unique_words.pop(original_token)
                        unique_words["<unk>"] += 1
                        token_list[i] = "<unk>"
            altered_text.write(f'<s> {" ".join(token_list)} </s>\n')
        
        vocabulary.write("vocabulary = {\n")
        for token, count in unique_words.items():
            vocabulary.write(f'\t"{token}": {count},\n')
        vocabulary.write("}")
            

preprocess_sentences("brown-test")
preprocess_sentences("brown-train")
preprocess_sentences("learner-test")


