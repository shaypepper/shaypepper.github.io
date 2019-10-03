# Homework 1

### by Shay Culpepper for CS74040, The Graduate Center

1. How many word types (unique words) are there in the training corpus? Please include the padding symbols and the unknown token.

   There were 28250 unique words in the training corpus.

2. How many word tokens are there in the training corpus?

   There were 446474 word tokens in the training corpus.

3. What percentage of word tokens and word types in each of the test corpora did not occur in training (before you mapped the unknown words to `<unk>` in training and test data)?

   - For `brown-test.txt`, 6.58% of tokens were unseen in the training data and 22.77% of unique words were unseen in the training data.
   - For `learner-test.txt`, 5.67% of tokens were unseen in the training data and 16.37% of unique words were unseen in the training data.

4. What percentage of bigrams (bigram types and bigram tokens) in each of the test corpora that did not occur in training (treat `<unk>` as a token that has been observed)
   Proportion of unseen bigrams 0.637
   Proportion of unseen unique bigrams 0.414

5. Compute the log probabilities of the following sentences under the three models (ignore capitalization and pad each sentence as described above). Please list all of the parameters required to compute the probabilities and show the complete calculation. Which of the parameters have zero values under each model?

6. Compute the perplexities of each of the sentences above under each of the models.

   - He was laughed off the screen.

     Parameters:
     `('<s>', 'he')`, `('he', 'was')`, `('was', 'laughed')`, `('laughed', 'off')`, `('off', 'the')`, `('the', 'screen')`, `('screen', '.')`, `('.', '</s>')`,

   | Model        | Log probability     | Perplexity         |
   | ------------ | ------------------- | ------------------ |
   | unigram      | -89.76251620845882  | 1005.4411405287508 |
   | bigram       | -63.27502668935062  | 130.74015668352095 |
   | add-one      | -178.9484631211795  | 967004.158975165   |
   | katz-backoff | -105.46869697719218 | 3370.4934554055917 |

   - There was no compulsion behind them.
     Parameters:
     `('<s>', 'there')`, `('there', 'was')`, `('was', 'no')`, `('no', '<unk>')`, `('<unk>', 'behind')`, `('behind', 'them')`, `('them', '.')`, `('.', '</s>')`,
     | Model | Log probability | Perplexity |
     |-------|-----------------|------------|
     | unigram | -76.37391375755156 | 358.5400366880077 |
     | bigram | -113.65244303130882 | 6330.260811682017 |
     | add-one | -165.6660254657492 | 347664.48248948477 |
     | katz-backoff | -113.92054401361389 | 6462.327828039266 |

   - I look forward to hearing your reply.
     Parameters:
     `('<s>', 'i')`, `('i', 'look')`, `('look', 'forward')`, `('forward', 'to')`, `('to', 'hearing')`, `('hearing', 'your')`, `('your', 'reply')`, `('reply', '.')`, `('.', '</s>')`,
     | Model | Log probability | Perplexity |
     |-------|-----------------|------------|
     | unigram | -111.81954565987785 | 2323.2916658327563 |
     | bigram | -115.86663586420943 | 3075.6243399833056 |
     | add-one | -214.68168714178157 | 2901100.2397360853 |
     | katz-backoff | -152.3657104246401 | 38606.89859203205 |

7) Compute the perplexities of the entire test corpora, separately for the brown-test.txt and learner-test.txt under each of the models. Discuss the differences in the results you obtained.

`brown-test`

| Model        | Perplexity         | Log probability     |
| ------------ | ------------------ | ------------------- |
| unigram      | 1789.302474437951  | -200090.3523966521  |
| bigram       | 2053.0440230316867 | -212830.6418155996  |
| add one      | 2508225.911900997  | -411176.79809220164 |
| katz backoff | 22815.28004086028  | -280027.9198454581  |

`learned-test`

| Model        | Perplexity         | Log probability     |
| ------------ | ------------------ | ------------------- |
| unigram      | 2007.3295704773334 | -100604.63659220317 |
| bigram       | 1819.2877583169204 | -104717.95822766732 |
| add one      | 2565061.627244237  | -205879.73509353877 |
| katz backoff | 22969.009626272844 | -140093.16797687442 |

Interestingly, it seems the bigram model is the best one according to the learned-test data while the unigram model is the winner for the brown-test. This is unexpected and I would need more time to consider why that would happen.
