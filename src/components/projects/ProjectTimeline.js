import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Modal } from "./Modal";
import "./Timeline.css";

export const ProjectTimeline = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  const projects = [
    {
      year: "2024",
      items: [
        {
          title: "MIDI Visualizer",
          description: 
          `This was one of my very first coding projects in college! It's a Python + Pygame tool 
          that visualizes MIDI note events in real time. It's all console based, so not very fancy or user friendly haha. 
          But I had fun making it!`,
          tech: "Python, Pygame",
          link: "https://github.com/yourusername/midi-visualizer",
          media: [
            { type: "image", src: "/media/midi-demo.png", alt: "Visualizer Screenshot" },
            { type: "video", src: "/media/midi-demo.mp4" },
          ],
        },
        {
          title: "Pygame Fluid Simulation",
          description: 
          `Continuing my budding interest in building stuff using Pygame, I made a simple fluid simulation. 
          And I mean very simple. It's basically just rendered circles that don't like to overlap and that you can throw around.
          I would later come to conquer this project later on in a much better way.`,
          tech: "Ptyhon, Pygame",
          media: [
            { type: "video", src: "/PygameSim.mp4" },
          ],
        },
      ],
    },
    {
      year: "2025",
      items: [
        {
          title: "Cocomposer! - Still in Progress",
          description: 
          `Over the past year, I have been working with Professor Todd Schmid on a really cool project called Cocomposer.
          The goal is to create a program that enables users to compose generative electronic music through what's called
          a State Machine. There's a lot of really interesting research behind this, and it's been a blast to work on!
          There's a lot of funky math going on behind the scenes, but the end result is a really fun and interactive way to make music.
          We're currently in the process of transerring the visuals from a terminal based UI to a more user friendly GUI using Pygame,
          and then eventually switching languages from Python so we can fine tune it.
          `,
          tech: "Python, Pygame, Music Theory",
          link: "https://github.com/fauxefox/cocomposer",
          link2Text: "Todd Schmid →",
          link2: "https://toddtoddtodd.net/",
          media: [
            { type: "image", src: "/Cocomposer_Kalman_Poster-1.png", alt: "Visualizer Screenshot" },
            { type: "image", src: "/Terminal Cocomposer.png", alt: "Visualizer Screenshot" },
            { type: "image", src: "/CocomposerGui.png", alt: "Visualizer Screenshot" },
          ],
        },
        {
          title: "Dewdrop Canyon!",
          description: 
          `For my Software Engineering and Design course at Bucknell University, I was tasked with working on a 
          project with three other students to create a program that demonstrated our understanding of Java and object oriented design. 
          Inspired by ConcernedApe's Stardew Valley, we set out to create our rendition, "Dewdrop Canyon."
          
          Over four weeks, we developed, tested, and built our game from the ground up coding entirely in Java and using JavaFx.`,
          tech: "Java, JavaFX, Scene Builder",
          link: "https://gitlab.bucknell.edu/jwg019/csci205_final_project",
          link2: "https://mediaspace.bucknell.edu/media/Dewdrop+Canyon+-+CSCI2025+Final+Project+Team07+Presentation+/1_09s6i0ps",
          media: [
            { type: "image", src: "/DewdropHome.png", alt: "Visualizer Screenshot" },
            { type: "image", src: "/DewdropCabin.png", alt: "Visualizer Screenshot" },
            { type: "image", src: "/DewdropFarm.png", alt: "Visualizer Screenshot" },
            { type: "image", src: "/DewdropPlants.png", alt: "Visualizer Screenshot" },
          ],
        },
        {
          title: "Improved Fluid Simulation :)",
          description: 
          `I was never satisfied with my first attempt at a fluid sim, so I made a much better one!
          I used a particle based approach with SPH (Smoothed Particle Hydrodynamics) for this one,
          which worked much better for fluid-like behavior. I had so much fun with this one! I think
          it's really piqued my interest in simulations and physics engines, and I'm hoping to do some
          more work on this kind of stuff in the future. 
          This one was heavily inspired by Sebastian Lague's implementation on Youtube. He has an
          incredible channel that I highly recommend checking out if you're into game dev and simulations.`,
          tech: "Unity, C#",
          link: "https://github.com/jackson-greninger/FluidSim",
          link2Text: "Sebastian's Video →",
          link2: "https://www.youtube.com/watch?v=rSKMYc1CQHE",
          media: [
            { type: "video", src: "/FluidSim.mp4" },
            { type: "video", src: "/GasSim.mp4" },
          ],
        },
        {
          title: "Neopixels!",
          description: 
          `In one of my Electrical and Computer Engineering courses we were introduced to Neopixels. I found them
          pretty interesting, so I went to Bucknell's makerspace and picked up an 8x8 grid of them to play around with.
          I enjoyed making different patterns in MicroPython, but I think my favorite one was Conway's Game of Life. Check
          it out!`,
          tech: "MicroPython, Neopixels, Raspberry Pico",
          media: [
            { type: "video", src: "/Conway.mp4" },
          ],
        },
        {
          title: "Personal Website!",
          description: 
          `This is the site you’re viewing right now — built with React, Three.js, and some procedural stuff.
          I started with a template that I found on GitHub that was created by Jo Lienhoop, and then heavily 
          modified it from there to make it my own. I think it came together quite nicely!`,
          tech: "React, Three.js, GLSL, CSS, JS, HTML",
          link: "https://github.com/jackson-greninger/personal-website-react",
          link2Text: "Jo's Template →",
          link2: "https://github.com/JoHoop/personal-website-react"
        },
      ],
    },
  ];

  const handleNext = () => {
    if (!selectedProject?.media) return;
    setMediaIndex((prev) => (prev + 1) % selectedProject.media.length);
  };

  const handlePrev = () => {
    if (!selectedProject?.media) return;
    setMediaIndex((prev) => (prev - 1 + selectedProject.media.length) % selectedProject.media.length);
  };

  return (
    <div className="timeline-container">
      {projects.map((section, i) => (
        <div key={i} className="timeline-section">
          <h1 className="timeline-year">{section.year}</h1>

          {section.items.map((proj, j) => (
            <div
              key={j}
              style={{ display: "flex", justifyContent: "center", position: "relative", cursor: "pointer" }}
              onClick={() => {
                setSelectedProject(proj);
                setMediaIndex(0);
              }}
            >
              <ProjectCard {...proj} />

              {/* Timeline line segment between cards */}
              {j < section.items.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "95.5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "2rem",
                    background: "linear-gradient(180deg, #3d3d3d 0%, #ac691e 50%, #3d3d3d 100%)",
                    borderRadius: "2px",
                    backgroundSize: "100% 200%",
                    animation: "gradientShift 6s linear infinite",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Modal */}
      {selectedProject && (
        <Modal
          onClose={() => {
            setSelectedProject(null);
            setMediaIndex(0);
          }}
        >
          <h2 style={{ color: "#ffae00", marginBottom: "1rem" }}>{selectedProject.title}</h2>
          <p style={{ marginBottom: "1rem" }}>{selectedProject.description}</p>
          <p style={{ fontStyle: "italic", opacity: 0.8, marginBottom: "1rem" }}>{selectedProject.tech}</p>
          
          {selectedProject.link && (
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffae00", textDecoration: "none", display: "block", marginBottom: "1rem" }}
            >
              View Repo →
            </a>
          )}
          {selectedProject.link2 && (
            <a
              href={selectedProject.link2}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffae00", textDecoration: "none", display: "block", marginBottom: "1rem" }}
            >
              {selectedProject.link2Text || "Demo and Presentation →"}
            </a>
          )}

          {/* Media Gallery */}
          {selectedProject.media && selectedProject.media.length > 0 && (
            <div style={{ position: "relative", marginTop: "1rem" }}>
              {selectedProject.media[mediaIndex].type === "image" && (
                <img
                  src={selectedProject.media[mediaIndex].src}
                  alt={selectedProject.media[mediaIndex].alt || ""}
                  style={{ width: "100%", borderRadius: "0.5rem" }}
                />
              )}
              {selectedProject.media[mediaIndex].type === "video" && (
                <video
                  key={mediaIndex} // force React to remount the video element
                  controls
                  style={{ width: "100%", borderRadius: "0.5rem" }}
                >
                  <source 
                    src={selectedProject.media[mediaIndex].src} 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              {selectedProject.media[mediaIndex].type === "iframe" && (
                <iframe
                  src={selectedProject.media[mediaIndex].src}
                  title={selectedProject.media[mediaIndex].title || selectedProject.title + " media"}
                  style={{ width: "100%", height: "400px", borderRadius: "0.5rem" }}
                  frameBorder="0"
                />
              )}

              {/* Gallery Navigation */}
              {selectedProject.media.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      color: "#ffae00",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      color: "#ffae00",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
