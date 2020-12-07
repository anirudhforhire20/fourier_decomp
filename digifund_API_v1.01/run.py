from flaskapp import app
import routing, api, demopage

if __name__ == '__main__':
    app.run(host="0.0.0.0")