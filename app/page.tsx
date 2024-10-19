
import "./globals.css"
import LoginPage from "./LoginPage"

const Homepage = () => {
  return (
      <main className="flex min-h-screen">
          <div className="left-screen">
              <div className="welcome-text">
                  <h1>health-bridge</h1>
              </div>
              <div className="description">
                  <p>
                      A <strong>chatbot</strong> that helps you identify your problems, book an appointment, and save your time in efficient way.
                  </p>
              </div>
          </div>

          <div className="authentication-box">
              <LoginPage/>
          </div>
      </main>
  )
}

export default Homepage;
