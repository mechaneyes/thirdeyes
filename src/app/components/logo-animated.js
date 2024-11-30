import { motion } from "motion/react";
import { useEffect } from "react";

export default function AnimatedLogo() {
  return (
    <svg width="220" height="40" viewBox="-5 -3 217 40" fill="none">
      {[
        "M189.872 4.032H206.816V16.896C206.816 24.144 200.912 30.048 193.664 30.048C187.04 30.048 181.52 25.104 180.656 18.672H184.256C185.072 23.136 189.008 26.496 193.664 26.496C198.944 26.496 203.264 22.176 203.264 16.896V7.632H192.32C190.16 11.856 185.744 14.784 180.656 14.832V11.232C185.12 11.232 188.816 8.208 189.872 4.032Z",
        "M177.408 12.192L163.296 26.304C163.92 26.4 164.544 26.496 165.168 26.496C169.824 26.496 173.712 23.136 174.576 18.672H178.176C177.312 25.104 171.792 30.048 165.168 30.048C157.92 30.048 152.016 24.144 152.016 16.896C152.016 9.648 157.92 3.792 165.168 3.792C170.736 3.792 175.536 7.248 177.408 12.192ZM155.568 16.896C155.568 20.208 157.248 23.088 159.792 24.816L173.088 11.52C171.36 9.024 168.432 7.344 165.168 7.344C159.888 7.344 155.568 11.616 155.568 16.896Z",
        "M145.985 16.896V4.08H149.537V33.6H145.985V25.92C143.585 28.464 140.177 30.048 136.433 30.048C129.185 30.048 123.281 24.144 123.281 16.896V4.08H126.833V16.896C126.833 22.224 131.153 26.496 136.433 26.496C141.713 26.496 145.985 22.176 145.985 16.896Z",
        "M120.033 12.192L105.921 26.304C106.545 26.4 107.169 26.496 107.793 26.496C112.449 26.496 116.337 23.136 117.201 18.672H120.801C119.937 25.104 114.417 30.048 107.793 30.048C100.545 30.048 94.6406 24.144 94.6406 16.896C94.6406 9.648 100.545 3.792 107.793 3.792C113.361 3.792 118.161 7.248 120.033 12.192ZM98.1926 16.896C98.1926 20.208 99.8726 23.088 102.417 24.816L115.713 11.52C113.985 9.024 111.057 7.344 107.793 7.344C102.513 7.344 98.1926 11.616 98.1926 16.896Z",
        "M88.6103 0.288002H92.1623V16.896C92.1623 24.144 86.3063 30.048 79.0583 30.048C71.8102 30.048 65.9062 24.144 65.9062 16.896C65.9062 9.648 71.8102 3.792 79.0583 3.792C82.8023 3.792 86.2103 5.376 88.6103 7.92V0.288002ZM88.6103 16.896C88.6103 11.616 84.3382 7.344 79.0583 7.344C73.7782 7.344 69.4583 11.616 69.4583 16.896C69.4583 22.176 73.7782 26.496 79.0583 26.496C84.3382 26.496 88.6103 22.176 88.6103 16.896Z",
        "M50.2969 16.896C50.2969 9.648 56.1529 3.792 63.4009 3.744V7.296C58.1209 7.344 53.8489 11.616 53.8489 16.896V29.808H50.2969V16.896Z",
        "M44.25 7.728H47.802V29.808H44.25V7.728ZM48.426 2.4C48.426 3.744 47.37 4.8 46.026 4.8C44.682 4.8 43.626 3.744 43.626 2.4C43.626 1.104 44.682 0 46.026 0C47.37 0 48.426 1.104 48.426 2.4Z",
        "M19.0676 17.136V29.808H15.5156V0.288002H19.0676V8.112C21.4676 5.568 24.8756 3.984 28.6196 3.984C35.9156 3.984 41.7716 9.888 41.7716 17.136V29.808H38.2196V17.136C38.2196 11.856 33.9476 7.536 28.6196 7.536C23.3396 7.536 19.0676 11.856 19.0676 17.136Z",
        "M0 0.192001H3.552V11.568H13.008V15.12H3.552V16.896C3.552 22.176 7.824 26.448 13.104 26.496V30.048C5.856 30.048 0 24.288 0 17.04V0.192001Z",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#4C77F2"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            transition: {
              times: [0, 0.4, 0.6, 1],
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
        />
      ))}
    </svg>
  );
}