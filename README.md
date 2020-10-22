# Groupomania

***Cloner le projet :***
```
git clone https://github.com/ronvts/P7.git
```

***backend***
```
npm install
```
Afin de tester l'application, veuillez créer un fichier .env dans le dossier du backend en ajoutant vos informations de connexion à la base de données :

```
JWT_TOKEN= votre_token
DB_USERNAME = root
DB_PASSWORD = password
DB_DATABASE = database
DB_HOST = localhost
```
lancez ensuite les commandes :
```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm run dev
```
optionnel :
```
npx sequelize-cli db:seed:all
```
***frontend***
```
npm install
npm run serve
```
