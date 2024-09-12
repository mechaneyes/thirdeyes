"use client";

import { useEffect, useRef } from "react";
import { Column, Grid } from "@carbon/react";
import mermaid from "mermaid";

export default function MermaidDiagram() {
  const ref = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      themeVariables: {
        primaryColor: "#BB2528",
        primaryTextColor: "#ff0000",
        primaryBorderColor: "#2FBFFF",
        lineColor: "#2FBFFF",
        secondaryColor: "#006100",
        tertiaryColor: "#fff",
      },
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: "basis",
        nodeBorder: "#2FBFFF",
        nodeTextColor: "#2FBFFF",
      },
    });

    mermaid.run({
      querySelector: ".mermaid",
      flowchart: {
        useMaxWidth: false,
      },
    });
  }, []);

  return (
    <>
      <h3 className="pt-16 pb-8 text-center text-white">
        Hexagram v Third Bridge Creative
      </h3>{" "}
      <Grid className="thirdeyes chat editor engineering">
        <Column
          max={10}
          xlg={10}
          lg={10}
          md={4}
          sm={2}
          // className="engineering__panel"
        >
          <div
            className="chat__panel__inner chat__panel__inner--mermaid mermaid grid-rows-1 justify-center pt-8 pb-8 px-4"
            ref={ref}
          >
            {`
      flowchart TB
        subgraph A[" "]
          direction TB
          A0[Data Collection and Preparation]
          A0 --> A1[Gather existing artist bios]
          A0 --> A2[Build a diversity set of artists, genres, stages, and types]
          A0 --> A3[Organize and categorize bios]
        end

        subgraph B[" "]
          direction TB
          B0[Versioning and Update System]
          B0 --> B1[Implement version control]
          B0 --> B2[Develop system for updates and comparisons]
        end

        subgraph C[" "]
          direction TB
          C0[Bio Analysis and Feature Extraction]
          C0 --> C1[Analyze bios for key characteristics]
          C0 --> C2[Extract quantifiable features]
          C0 --> C3[Determine and set evaluation metrics]
        end

        subgraph D[" "]
          direction TB
          D0[Data Augmentation through Fuzzing]
          D0 --> D1[Implement bio fuzzing techniques]
          D0 --> D2[Generate large set of fuzzed bios]
          D0 --> D3[Analyze fuzzed bios]
        end

        subgraph E[" "]
          direction TB
          E0[Prompt Engineering]
          E0 --> E1[Create base prompts]
          E0 --> E2[Implement prompt fuzzing techniques]
          E0 --> E3[Generate diverse prompts]
        end

        subgraph F[" "]
          direction TB
          F0[Multi-LLM Testing Framework]
          F0 --> F1[Set up testing pipeline]
        end

        subgraph G[" "]
          direction TB
          G0[Evaluation System]
          G0 --> G1[Develop evaluation metrics]
          G0 --> G2[Implement automated scoring]
          G0 --> G3[Set up human-in-the-loop review]
        end

        subgraph H[" "]
          direction TB
          H0[Fine-tuning and Optimization]
          H0 --> H1[Fine-tune selected LLMs]
          H0 --> H2[Develop iterative refinement system]
        end

        subgraph I[" "]
          direction TB
          I0[Testing and Quality Assurance]
          I0 --> I1[Conduct extensive testing]
          I0 --> I2[Perform A/B testing]
          I0 --> I3[Refine system based on tests]
        end

        subgraph J[" "]
          direction TB
          J0[Deployment and Monitoring]
          J0 --> J1[Deploy scalable environment]
          J0 --> J2[Implement adaptive learning]
        end

        A --> B --> C --> D --> E --> F --> G --> H --> I --> J
      `}
          </div>
        </Column>
        <Column
          max={6}
          xlg={6}
          lg={6}
          md={4}
          sm={2}
          // className="editor__panel editor__panel--mvp"
        >
          <div className="chat__panel__inner hex-list items-center pt-8 px-8 text-white">
            <ul className="">
              <li>
                <h3>Data Collection and Preparation</h3>
                <ul className="list-disc list-inside">
                  <li>Gather existing artist bios</li>
                  <li>
                    Build a diversity set of artists, genres, stages, and types
                  </li>
                  <li>Organize and categorize bios</li>
                </ul>
              </li>
              <li>
                <h3>Versioning and Update System</h3>
                <ul className="list-disc list-inside">
                  <li>Implement version control</li>
                  <li>Develop system for updates and comparisons</li>
                </ul>
              </li>
              <li>
                <h3>Bio Analysis and Feature Extraction</h3>
                <ul className="list-disc list-inside">
                  <li>Analyze bios for key characteristics</li>
                  <li>Extract quantifiable features</li>
                  <li>Determine and set evaluation metrics</li>
                </ul>
              </li>
              <li>
                <h3>Data Augmentation through Fuzzing</h3>
                <ul className="list-disc list-inside">
                  <li>Implement bio fuzzing techniques</li>
                  <li>Generate large set of fuzzed bios</li>
                  <li>Analyze fuzzed bios</li>
                </ul>
              </li>
              <li>
                <h3>Prompt Engineering</h3>
                <ul className="list-disc list-inside">
                  <li>Create base prompts</li>
                  <li>Implement prompt fuzzing techniques</li>
                  <li>Generate diverse prompts</li>
                </ul>
              </li>
              <li>
                <h3>Multi-LLM Testing Framework</h3>
                <ul className="list-disc list-inside">
                  <li>Set up testing pipeline</li>
                </ul>
              </li>
              <li>
                <h3>Evaluation System</h3>
                <ul className="list-disc list-inside">
                  <li>Develop evaluation metrics</li>
                  <li>Implement automated scoring</li>
                  <li>Set up human-in-the-loop review</li>
                </ul>
              </li>
              <li>
                <h3>Fine-tuning and Optimization</h3>
                <ul className="list-disc list-inside">
                  <li>Fine-tune selected LLMs</li>
                  <li>Develop iterative refinement system</li>
                </ul>
              </li>
              <li>
                <h3>Testing and Quality Assurance</h3>
                <ul className="list-disc list-inside">
                  <li>Conduct extensive testing</li>
                  <li>Perform A/B testing</li>
                  <li>Refine system based on tests</li>
                </ul>
              </li>
              <li>
                <h3>Deployment and Monitoring</h3>
                <ul className="list-disc list-inside">
                  <li>Deploy scalable environment</li>
                  <li>Implement adaptive learning</li>
                </ul>
              </li>
            </ul>
          </div>
        </Column>
      </Grid>
    </>
  );
}
