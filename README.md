## Get Started

Install Dependencies
```
yarn install
```

Next Step is creating a `config.env` file, this file will contain the `PORT` and the `MONGO_URI`.


for the sake of demonstration, the contents of the file should be:
```
PORT=5000
MONGO_URI=mongodb+srv://task-manager:XDxjWvsLGjiqZ2@cluster0.aqrpjjm.mongodb.net/task-manager?retryWrites=true&w=majority
```

Finally, launch the server using:
```
yarn start
```

Predeployed server: https://task-manager-backend-iqxwcgan7-howardlight.vercel.app/