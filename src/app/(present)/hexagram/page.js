"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Grid } from "@carbon/react";
import mermaid from "mermaid";

export default function MermaidDiagram() {
  const ref = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (isClient) {
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
          clusterBkg: "#FF0000",
        },
      });

      mermaid.run({
        querySelector: ".mermaid",
        flowchart: {
          useMaxWidth: false,
        },
      });
    }
  }, [isClient]);

  return (
    <>
      <h3 className="pt-16 pb-8 text-center text-white">
        Hexagram v Third Bridge Creative
      </h3>
      <Grid className="thirdeyes chat editor engineering">
        <Column
          max={10}
          xlg={10}
          lg={10}
          md={4}
          sm={2}
          // className="engineering__panel"
        >
          {isClient && (
            <div
              className="chat__panel__inner chat__panel__inner--mermaid mermaid grid-rows-1 justify-center pt-8"
              ref={ref}
            >
              {`
                flowchart TB
                    subgraph A[" "]
                        direction TB
                        A0[Data Collection and Preparation]
                        A0 --> A1[Gather existing artist bios]
                        A0 --> A2[Ensure diversity in genres, stages, and types]
                        A0 --> A3[Organize and categorize bios]
                    end

                    subgraph B[" "]
                        direction TB
                        B0[Bio Analysis and Feature Extraction]
                        B0 --> B1[Analyze bios for key characteristics]
                        B0 --> B2[Extract quantifiable features]
                        B0 --> B3[Implement evaluation metrics]
                    end

                    subgraph C[" "]
                        direction TB
                        C0[Data Augmentation through Fuzzing]
                        C0 --> C1[Implement bio fuzzing techniques]
                        C0 --> C2[Generate large set of fuzzed bios]
                        C0 --> C3[Analyze fuzzed bios]
                    end

                    subgraph D[" "]
                        direction TB
                        D0[Prompt Engineering]
                        D0 --> D1[Create base prompts]
                        D0 --> D2[Implement prompt fuzzing techniques]
                        D0 --> D3[Generate diverse prompts]
                    end

                    subgraph E[" "]
                        direction TB
                        E0[Multi-LLM Testing Framework]
                        E0 --> E1[Develop unified interface]
                        E0 --> E2[Implement adapters for various LLMs]
                        E0 --> E3[Set up testing pipeline]
                        E0 --> E4[Implement ensemble approach]
                    end

                    subgraph F[" "]
                        direction TB
                        F0[Evaluation System]
                        F0 --> F1[Develop evaluation metrics]
                        F0 --> F2[Implement automated scoring]
                        F0 --> F3[Set up human-in-the-loop review]
                    end

                    subgraph G[" "]
                        direction TB
                        G0[Fine-tuning and Optimization]
                        G0 --> G1[Fine-tune selected LLMs]
                        G0 --> G2[Implement ensemble approach]
                        G0 --> G3[Develop iterative refinement system]
                    end

                    subgraph H[" "]
                        direction TB
                        H0[Personalization and Fact Consistency]
                        H0 --> H1[Create template system for artist-specific details]
                        H0 --> H2[Implement fact-checking mechanism]
                        H0 --> H3[Implement temporal awareness]
                    end

                    subgraph I[" "]
                        direction TB
                        I0[Multi-Modal Enhancement]
                        I0 --> I1[Incorporate additional data types]
                        I0 --> I2[Develop system for multi-modal bio generation]
                    end

                    subgraph J[" "]
                        direction TB
                        J0[Versioning and Update System]
                        J0 --> J1[Implement version control]
                        J0 --> J2[Develop system for updates and comparisons]
                    end

                    subgraph K[" "]
                        direction TB
                        K0[API Development]
                        K0 --> K1[Design and implement API]
                        K0 --> K2[Create API documentation]
                        K0 --> K3[Implement internationalization]
                    end

                    subgraph L[" "]
                        direction TB
                        L0[Testing and Quality Assurance]
                        L0 --> L1[Conduct extensive testing]
                        L0 --> L2[Perform A/B testing]
                        L0 --> L3[Refine system based on tests]
                    end

                    subgraph M[" "]
                        direction TB
                        M0[Deployment and Monitoring]
                        M0 --> M1[Deploy scalable environment]
                        M0 --> M2[Set up monitoring for performance]
                        M0 --> M3[Implement adaptive learning]
                    end

                    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K --> L --> M
              `}
            </div>
          )}
        </Column>
        <Column
          max={6}
          xlg={6}
          lg={6}
          md={4}
          sm={2}
          // className="editor__panel editor__panel--mvp"
        >
          <div className="chat__panel__inner hex-list items-center pt-8 text-white">
            <ul className="">
              <li>
                <h3>Data Collection and Preparation</h3>
                <ul className="list-disc list-inside">
                  <li>Gather existing artist bios</li>
                  <li>Ensure diversity in genres, stages, and types</li>
                  <li>Organize and categorize bios</li>
                </ul>
              </li>
              <li>
                <h3>Bio Analysis and Feature Extraction</h3>
                <ul className="list-disc list-inside">
                  <li>Analyze bios for key characteristics</li>
                  <li>Extract quantifiable features</li>
                  <li>Implement evaluation metrics</li>
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
                  <li>Develop unified interface</li>
                  <li>Implement adapters for various LLMs</li>
                  <li>Set up testing pipeline</li>
                  <li>Implement ensemble approach</li>
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
                  <li>Implement ensemble approach</li>
                  <li>Develop iterative refinement system</li>
                </ul>
              </li>
              <li>
                <h3>Personalization and Fact Consistency</h3>
                <ul className="list-disc list-inside">
                  <li>Create template system for artist-specific details</li>
                  <li>Implement fact-checking mechanism</li>
                  <li>Implement temporal awareness</li>
                </ul>
              </li>
              <li>
                <h3>Multi-Modal Enhancement</h3>
                <ul className="list-disc list-inside">
                  <li>Incorporate additional data types</li>
                  <li>Develop system for multi-modal bio generation</li>
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
                <h3>API Development</h3>
                <ul className="list-disc list-inside">
                  <li>Design and implement API</li>
                  <li>Create API documentation</li>
                  <li>Implement internationalization</li>
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
                  <li>Set up monitoring for performance</li>
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