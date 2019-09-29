import json
from  datetime import datetime as dt

class MLModel:
    def __init__(self, training_data_fn):
        self.trie = {}
        with open(f'preprocessed_data/{training_data_fn}') as corpus:
            j = 0
            for sentence in corpus:
                j += 1
                tokens = sentence.strip('\n').split()
                for i in range(0, len(tokens)-2):
                    first_token = tokens[i]
                    second_token = tokens[i + 1]

                    # create entry for first token in trie
                    if first_token not in self.trie:
                        self.trie[first_token] = {
                            "count": 1,
                            "children": {
                                second_token: {
                                    "count": 1,
                                }
                            },
                        }
                        continue
                    
                    self.trie[first_token]["count"] += 1

                    if second_token not in self.trie[first_token]["children"]:
                        self.trie[first_token]["children"][second_token] = {
                            "count": 1,
                        }
                        continue
                    
                    self.trie[first_token]["children"][second_token]["count"] += 1

print(dt.now())
new_model = MLModel("brown-train.txt")
print(dt.now())
                    


                    
