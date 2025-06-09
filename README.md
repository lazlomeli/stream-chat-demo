# Stream Chat Demo 
@author: _Lazlo Meli_ [LinkedIn](https://www.linkedin.com/in/lazlo-meli-fern%C3%A1ndez-31803b224/)

---


### Features:

- Real-time messaging
- Custom channel header
- Typing indicators
- Fake user simulation


---

<br />

### 1. Setup the project 

- Create a [Stream Account](https://getstream.io/)
- Start a project using the [Chat SDK for React](https://getstream.io/try-for-free/).

<br />

---

<br />

### 2. Authentication
- Find your new project's Stream API key on the main [Dashboard](https://dashboard.getstream.io/organization/) and add it to an `.env` file with the name `REACT_APP_STREAM_API_KEY`

<br />

---

<br />

### 3. Change project to development
- Change the project environment from **production** to **development** by clicking on `Quick Actions > Environment: Development`
- Disable the Auth checks to be able to use development authentication tokens:
  - Scroll down on the Dashboard page until you see **Authentication** section.

<br />

---

<br />

### 4. Run the project

- `npm i` on the project folder to install dependencies.

- `cd` to project location

- Run in the terminal:
```
$ npm start
```

- Go to `localhost:3000` (should be automatically opened by `create-react-app` service)
