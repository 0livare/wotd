# Word of the Day (quiz)

Do you ever feel linguistically challenged? Do your friends use a beautiful motley of words and you feel left in their cerebral dust? Or are your purposes orthogonal to those? Are you an English brainiac whose brilliance is unbridled?  Either way, this app is for you!

WOTD is a command line word quiz that you can compete against your friends with.  For every quiz it generates, it also spits out a code that can be used to recreate that very same quiz, so that everyone embarks on the same scholarly quest for knowledge.

## Getting Started

```bash
git clone https://github.com/zposten/wotd.git
cd wotd
npm install
npm link # allows for usage of global 'wotd' instead of 'node index.js'
wotd generateQuiz
```

For more specifics about commands and command syntax, run `wotd --help`.

## Customizing the words

Don't like my words? No problem!  You can add to/change them in the `src/definitions.js` file.
