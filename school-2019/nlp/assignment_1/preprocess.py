def preprocess_files():
    unique_training_words = {'<unk>': 0, '<s>': 0, '</s>': 0}
    training_words_with_unk = {'<unk>': 0, '<s>': 0, '</s>': 0}

    # Process training data
    with open(f'original_data/brown-train.txt' , 'r') as original_text, open(f'preprocessed_data/brown-train.txt' , 'w') as  altered_text:
        token_lists = []
        total_tokens = 0

        # Convert to lowercase and mark first occurences
        for line in original_text:
            processed_line = line.lower().strip('\n')
            token_list = []
            for token in processed_line.split():
                total_tokens += 1
                if token not in unique_training_words:
                    token_list.append(f'<first>{token}')
                    unique_training_words[token] = 1
                    training_words_with_unk[token] = 1
                else: 
                    token_list.append(token)
                    unique_training_words[token] += 1
                    training_words_with_unk[token] += 1
            token_lists.append(token_list)
        

        print('Unique words in training:', len(unique_training_words.keys()))
        print('Total tokens in training:', total_tokens)

        # Convert one time words to unknowns in training data
        for token_list in token_lists:
            for i, token in enumerate(token_list):
                if "<first>" in token:
                    original_token = token.replace("<first>", "")
                    if unique_training_words[original_token] > 1:
                        token_list[i] = original_token
                    else:
                        training_words_with_unk.pop(original_token)
                        training_words_with_unk["<unk>"] += 1
                        token_list[i] = "<unk>"
            altered_text.write(f'<s> {" ".join(token_list)} </s>\n')
            unique_training_words['</s>'] += 1
            training_words_with_unk['</s>'] += 1

    # Process test data
    preprocess_test_file('brown-test', unique_training_words, training_words_with_unk)
    preprocess_test_file('learner-test', unique_training_words, training_words_with_unk)


def preprocess_test_file(filename, unique_training_words, training_words_with_unk): 
    with open(f'original_data/{filename}.txt' , 'r') as original_text, open(f'preprocessed_data/{filename}.txt' , 'w') as  altered_text:
        token_lists = []
        total_tokens = 0

        unseen_tokens = 0
        unseen_unique_words = 0
        unique_words = set()

        # Convert to lowercase and mark first occurences
        for line in original_text:
            processed_line = line.lower().strip('\n')
            token_list = []
            for token in processed_line.split():
                total_tokens += 1

                # Unseen in training data
                if token not in unique_training_words:
                    unseen_tokens += 1

                    if token not in unique_words:
                        unseen_unique_words += 1 
                    token_list.append(f'<unk>')

                # Unseen in preprocessed training data
                elif token not in training_words_with_unk:
                    token_list.append(f'<unk>')
                
                # Seen in preprocessed data
                else: 
                    token_list.append(token)

                unique_words.add(token)

            token_lists.append(token_list)
        
        print("-" * 100)
        print(f'Total tokens in {filename}:', total_tokens)
        print(f'Total unseen tokens in {filename}:', unseen_tokens)
        print('\tProportion:', unseen_tokens / total_tokens)
        print(f'Unique words in {filename}:', len(unique_words))
        print(f'Total unseen unique words in {filename}:', unseen_unique_words)
        print('\tProportion:', unseen_unique_words / len(unique_words))

        for token_list in token_lists:
            altered_text.write(f'<s> {" ".join(token_list)} </s>\n')


preprocess_files()


