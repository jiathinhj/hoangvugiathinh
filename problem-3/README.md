# List out the computational inefficiencies and anti-patterns found in the code block.

a. ReactJS with TypeScript:
- There are many undefined types: `BoxProps`, `Prices`
- Thera are properties with any type: `blockchain` as it hasn't been declared in the WalletBalance interface
- Reduce the boilerplate by extending the `WalletBalance` interface for `FormattedWalletBalance`

b. Functional components.


c. React Hooks: 
- Two undefined hooks: `useBalance` and `usePrice`. They should be placed in the separate components so that we can reuse them.
- In sortedBalances func with useMemo, the `filter` and `sort` conditions should be shorten. And remove the redundant dependency `prices`.

I have refactored the block of code and structured it into folders and files. Pleae find it in the `components` folder


## Available Scripts
run `npm install` to install the packages
run `npm start` to start the project

