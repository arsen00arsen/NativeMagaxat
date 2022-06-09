module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
  "javascript.format.enable": false, 
    "eslint.autoFixOnSave": true, 
    "eslint.alwaysShowStatus": true, 
    "eslint.options": { 
    "extensions": [ ".html", ".js", ".vue", ".jsx" ] 
    }, 
    "eslint.validate": [ 
        { "language": "html", "autoFix": true }, 
        { "language": "javascript", "autoFix": true }, 
        { "language": "javascriptreact", "autoFix": true } 
    ], 
    "editor.codeActionsOnSave": { 
        "source.fixAll.eslint": true 
    },
};
