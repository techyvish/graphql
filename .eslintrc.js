module.exports = {
    'parser': 'babel-eslint',
    'extends': ['airbnb-base', 'prettier'],
    'env': {
        'mocha': true
    },
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': false
        }
    },
    'rules': {
        'no-param-reassign': ['error', {
            'props': false
        }],
    }
};
