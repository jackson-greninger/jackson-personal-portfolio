import React from 'react';
import PageButtonsPanel from '../components/pagebutton/pagebuttonpanel.js';
import { ProceduralBackgroundOnly } from '../components/background/BackgroundOnly.js';

export const About = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ProceduralBackgroundOnly />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          color: "white",
          padding: "4rem 1.5rem",
          textAlign: "center",
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            lineHeight: 1.6,
            fontSize: "1.1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              letterSpacing: "0.05em",
              fontWeight: "600",
            }}
          >
            About Me
          </h1>
          {/* Image right under the title */}
          <img
            src={process.env.PUBLIC_URL + '/updated_headshot.jpg'}  // path relative to your public folder
            alt="About me"
            style={{
              width: "400px",
              height: "auto",
              borderRadius: "50%", // makes it circular if it's square
              marginBottom: "2rem",
            }}
          />

          {/* Academic & Professional Interests */}
          <section> 
            <h2 style={{ color: "#ffae00", marginBottom: "0.5rem" }}>Academic & Professional Interests</h2>
          </section>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.7" }}>
              I'm a current third-year student at Bucknell University, pursuing a double major in{" "}
              <a
                href="https://www.bucknell.edu/academics/college-engineering/majors-departments/dual-program-engineering-management"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffae42",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffd580";
                  e.target.style.borderBottom = "1px solid #ffd580";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffae42";
                  e.target.style.borderBottom = "1px solid transparent";
                }}
              >
                Computer Science and Engineering and Engineering Management
              </a>{" "}
              alongside a minor in philosophy.
            </p>

          <p>
            Right now, my education has been shaped by a liberal arts experience, where I have been able to live in and explore all
            three colleges at Bucknell: 
            <a
                href="https://www.bucknell.edu/academics/college-arts-sciences"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffae42",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffd580";
                  e.target.style.borderBottom = "1px solid #ffd580";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffae42";
                  e.target.style.borderBottom = "1px solid transparent";
                }}
              >
                Arts & Sciences,
              </a>{" "}
              <a
                href="https://www.bucknell.edu/academics/college-engineering"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffae42",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffd580";
                  e.target.style.borderBottom = "1px solid #ffd580";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffae42";
                  e.target.style.borderBottom = "1px solid transparent";
                }}
              >
                Engineering,
              </a>{" "}
                and{" "} 
              <a
                href="https://www.bucknell.edu/academics/freeman-college-management"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffae42",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffd580";
                  e.target.style.borderBottom = "1px solid #ffd580";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffae42";
                  e.target.style.borderBottom = "1px solid transparent";
                }}
              >
                 Management.
              </a>{" "} This has given me a unique perspective on
            how technology can be developed and deployed responsibly, while considering its broader societal impacts. 
            I like to consider myself more of a "hammer" than a "knife" given that I am a generalist and have a broad education.
          </p>

          <p>
            Professionally, I am all over the place and honestly just exploring different areas of tech.
            More specifically, I'm looking for a way to combine my skillsets in project management and software development/analytical problem solving
            to work on projects that have a positive social or environmental impact.  
          </p>

          {/* Values & Motivation */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "#ffae00", marginBottom: "0.5rem" }}>Values & Motivation</h2>
            <p>
              I am largely motivated by technology's potential to address complex global challenges and I perceive tech
              to be a tool and a means to an end, not an end in itself. I am grateful to have been born at the advent of the digital age,
              but I am also deeply aware of the ethical dilemmas and unintended consequences that can arise from technological advancements.
              As an impressionable young man looking to enter the workforce in a few years, I am committed to ensuring that my work aligns 
              with my values of sustainability, equity, and social responsibility.
            </p>
          </section>

          {/* Personal Interests / Hobbies */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "#ffae00", marginBottom: "0.5rem" }}>Personal Interests</h2>
            <p>
              There are genuinely so many things that I am interested in!
            </p>
            <p>
              For one, I love the outdoors. Growing up in Southern California, I have been blessed to live in proximity to so many 
              National Parks, national forests, and general escapes from society. This upcoming summer, I plan on finishing the{" "}
              <a
                href="https://jmtwilderness.org/map/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffae42",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffd580";
                  e.target.style.borderBottom = "1px solid #ffd580";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffae42";
                  e.target.style.borderBottom = "1px solid transparent";
                }}
              >
                 John Muir Trail,
              </a>{" "}
              a 211-mile trek through the Sierra Nevada mountain range. Anything outdoors related and I'm in haha.
            </p>

            <p>
              I also love books. I tend to stick mostly to science fiction and fantasy, but every now and then I'll pick up something
              outside of those two. Some of my favorite authors include Brandon Sanderson, Patrick Rothfuss, and R.F. Kuang. My favorite
              books (in no particular order) are The Kingkiller Chronicles, The Stormlight Archive, and The Three-Body Problem. If you
              also love reading, please follow me on {" "}
              <a
                href="https://www.goodreads.com/user/show/182944674-jackson-greninger"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffae42",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffd580";
                  e.target.style.borderBottom = "1px solid #ffd580";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#ffae42";
                  e.target.style.borderBottom = "1px solid transparent";
                }}
              >
                 Goodreads!
              </a>
            </p>

            <p>
              I'm also a big fan of music, and have been for the last decade or so. I unfortunately do not play
              any instruments, but I do love listening to music. I don't really have any specific genres that I stick to,
              but I tend to gravitate towards IDM (Intelligent Dance Music - weird genre name, I know), R&B/Soul, and
              alternative/indie rock. Some of my favorite artists include Aphex Twin, Daft Punk, The California Honeydrops, Loscil,
              and Nujabes. If you also love electronic music, check out my project Cocomposer! I'm working on some cool stuff there
              with Todd Schmid, a Computer Science Professor here at Bucknell.
            </p>
          </section>

          {/* Call to Action / Links */}
          <section>
            <h2 style={{ color: "#ffae00", marginBottom: "0.5rem" }}>Connect with Me</h2>
            <p>
              Feel free to explore my projects and reach out via LinkedIn!
            </p>
          </section>
  
        </div>

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: "2rem",
          }}
        >
          <PageButtonsPanel />
        </div>
      </div>
    </div>
  );
};
