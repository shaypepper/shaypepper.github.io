import json
from datetime import datetime as dt
from math import log

class MLEModel:
    def __init__(self, training_data_fn):
        self.trie = {'</s>': {"unigram_count": 0}}
        self.total_unigram_count = 0
        self.total_bigram_count = 0

        with open(f'preprocessed_data/{training_data_fn}') as corpus:
            j = 0
            for sentence in corpus:
                j += 1
                self.total_unigram_count += len(sentence)
                self.total_bigram_count += len(sentence) - 1
                self.trie['</s>']['unigram_count'] += 1

                tokens = sentence.strip('\n').split()
                for i in range(0, len(tokens) - 1):
                    first_token = tokens[i]
                    second_token = tokens[i + 1]

                    # create entry for first token in trie
                    if first_token not in self.trie:
                        self.trie[first_token] = {
                            "unigram_count": 1,
                            "children": {
                                second_token: {
                                    "bigram_count": 1,
                                }
                            },
                        }
                        continue
                    
                    self.trie[first_token]["unigram_count"] += 1

                    if second_token not in self.trie[first_token]["children"]:
                        self.trie[first_token]["children"][second_token] = {
                            "bigram_count": 1,
                        }
                        continue
                    
                    self.trie[first_token]["children"][second_token]["bigram_count"] += 1
        
    def get_unigram_count(self, w):
        return self.trie[w]["unigram_count"] if w in self.trie else 0
    
    def get_unigram_prob(self, w):
        word_count = self.get_unigram_count(w)
        return word_count / self.total_unigram_count

    def get_log_unigram_prob(self, w):
        prob = self.get_unigram_prob(w)
        return log(prob, 2) if prob else 0
    
    def get_bigram_count(self, w1, w2):
        if w1 in self.trie and w2 in self.trie[w1]["children"]:
            return self.trie[w1]["children"][w2]["bigram_count"]
        else:
            return 0

    def get_bigram_prob(self, w1, w2):
        bigram_count = self.get_bigram_count(w1, w2)
        return bigram_count / self.total_bigram_count

    def get_log_bigram_prob(self, w1, w2):
        prob = self.get_bigram_prob(w1, w2)
        return log(prob, 2) if prob else 0
    
    def get_add_one_prob(self, w1, w2):
        bigram_count = self.get_bigram_count(w1, w2) + 1
        vocabulary_size = len(self.trie.keys())
        return bigram_count / (self.total_bigram_count + vocabulary_size ** 2)

    def get_log_add_one_prob(self, w1, w2):
        prob = self.get_add_one_prob(w1, w2)
        return log(prob, 2) if prob else 0

    def get_alpha(self, w):
        unigram_count = self.get_unigram_count(w)
        following_word_count = len(self.trie[w]["children"].keys())
        return (following_word_count * 0.5) / unigram_count

    def get_katz_backoff_prob(self, w1, w2):
        bigram_count = self.get_bigram_count(w1, w2)

        if not bigram_count and w1 in self.trie:
            alpha = self.get_alpha(w1)
            w1_unigram_count = self.get_unigram_count(w1)
            w2_unigram_count = self.get_unigram_count(w2)
            return (w2_unigram_count * alpha) / (self.total_unigram_count - w1_unigram_count)
        elif not bigram_count: 
            return 0
        else:
            return (bigram_count - 0.5) / self.total_bigram_count

    def get_log_katz_backoff_prob(self, w1, w2):
        prob = self.get_katz_backoff_prob(w1, w2)
        return log(prob, 2) if prob else 0

    def new_bigrams_count(self, sentence, memo = {"unseen_bigram_count": 0, "unseen_unique_bigram_count": 0, "unique_bigrams": set()}):
        tokens = sentence.split()
        for i in range(len(tokens)):
            if tokens[i] not in self.trie:
                tokens[i] = '<unk>'
        bigrams = [(tokens[i], tokens[i + 1]) for i in range(len(tokens) -  1)]

        for bigram in bigrams:
            if not self.get_bigram_count(*bigram):
                memo["unseen_bigram_count"] += 1
                if bigram not in memo["unique_bigrams"]:
                    memo["unseen_unique_bigram_count"] += 1
                
            memo["unique_bigrams"].add(bigram)

        return memo


    def get_sentence_unigram_log_probability(self, sentence,  print_parameters =  True,  print_calculations =  True):
        tokens = sentence.split()
        log_prob = sum(self.get_log_unigram_prob(token) for token in tokens)
        l = log_prob / len(tokens)

        if print_parameters:
            print('-' * 100)
            print(sentence)
            print('\tParameters:', end="\n\t")
            for token in tokens:
                print(f'`{token}`', end=" ")
        if print_calculations: 
            print(f'\nThe log probability for the unigram model is {log_prob}')
            print(f'The perplexity for the unigram model is {2 ** (-l)}')

        return log_prob

    def get_sentence_bigram_log_probability(self, sentence, model_type,  print_parameters =  True,  print_calculations =  True):
        tokens = sentence.split()
        for i in range(len(tokens)):
            if tokens[i] not in self.trie:
                tokens[i] = '<unk>'
        bigrams = [(tokens[i], tokens[i + 1]) for i in range(len(tokens) -  1)]

        if model_type == 'add-one':
            get_log_probability = self.get_log_add_one_prob
        elif model_type == 'katz-backoff':
            get_log_probability = self.get_log_katz_backoff_prob
        else: 
            get_log_probability = self.get_log_bigram_prob
        
        log_prob = sum(get_log_probability(*bigram) for bigram in bigrams)
        l = log_prob / len(tokens)

        if print_parameters:
            print('-' * 100)
            print(sentence)
            print('\tParameters:', end="\n\t")
            for bigram in bigrams:
                print(f'`{bigram}`,', end=" ")
            
            print('\n| Model | Log probability | Perplexity |')
            print('|-------|-----------------|------------|')
        if print_calculations: 
            print(f'| {model_type} | {log_prob} | {2 ** (-l)} |')
        return log_prob

    def test_model(self, filename): 
        with open(f'preprocessed_data/{filename}') as test_corpus:
            unigram_count = 0
            unigram_sum = 0
            
            bigram_count = 0
            bigram_sum = 0
            add_one_sum =  0
            katz_backoff_sum = 0

            for line in test_corpus:
                sentence = line.replace("\n", "")
                sent_len = len(sentence.split())
                unigram_count += sent_len
                bigram_count += sent_len + 1

                unigram_sum += self.get_sentence_unigram_log_probability(sentence, False, False)
                bigram_sum += self.get_sentence_bigram_log_probability(sentence, 'bigram', False, False)
                add_one_sum += self.get_sentence_bigram_log_probability(sentence, 'add-one', False, False)
                katz_backoff_sum += self.get_sentence_bigram_log_probability(sentence, 'katz-backoff', False, False)
                
                new_bigrams = self.new_bigrams_count(sentence)

            unigram_l = unigram_sum /  unigram_count
            bigram_l  = bigram_sum / bigram_count
            add_one_l = add_one_sum / bigram_count
            katz_backoff_l =  katz_backoff_sum / bigram_count

            print(f'| unigram  | {2 ** (-unigram_l)} | {unigram_sum}  |')
            print(f'| bigram  | {2 ** (-bigram_l)} | {bigram_sum} |')
            print(f'| add one  | {2 ** (-add_one_l)} | {add_one_sum}  |')
            print(f'| katz backoff  | {2 ** (-katz_backoff_l)} | {katz_backoff_sum} |')

            print("Proportion of unseen bigrams", new_bigrams["unseen_bigram_count"] / bigram_count)
            print("Proportion of unseen unique bigrams", new_bigrams["unseen_unique_bigram_count"] / len(new_bigrams["unique_bigrams"]))

print(dt.now())
new_model = MLEModel("brown-train.txt")

sent_1 = '<s> he was laughed off the screen . </s>'
new_model.get_sentence_unigram_log_probability(sent_1)
new_model.get_sentence_bigram_log_probability(sent_1, 'bigram')
new_model.get_sentence_bigram_log_probability(sent_1, 'add-one', False)
new_model.get_sentence_bigram_log_probability(sent_1, 'katz-backoff', False)

sent_2 = '<s> there was no compulsion behind them . </s>'
new_model.get_sentence_unigram_log_probability(sent_2)
new_model.get_sentence_bigram_log_probability(sent_2, 'bigram')
new_model.get_sentence_bigram_log_probability(sent_2, 'add-one', False)
new_model.get_sentence_bigram_log_probability(sent_2, 'katz-backoff', False)

sent_3 = '<s> i look forward to hearing your reply . </s>'
new_model.get_sentence_unigram_log_probability(sent_3)
new_model.get_sentence_bigram_log_probability(sent_3, 'bigram')
new_model.get_sentence_bigram_log_probability(sent_3, 'add-one', False)
new_model.get_sentence_bigram_log_probability(sent_3, 'katz-backoff', False)

new_model.test_model("brown-test.txt")
new_model.test_model("learner-test.txt")
print(dt.now())
