import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the animations
const box1 = keyframes`
  0%, 50% {
    transform: translate(100%, 100%);
  }
  100% {
    transform: translate(100%, 200%);
  }
`;

const box2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(100%, 100%);
  }
`;

const box3 = keyframes`
  0%, 50% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const box4 = keyframes`
  0% {
    transform: translate(100%, 200%);
  }
  50% {
    transform: translate(0, 200%);
  }
  100% {
    transform: translate(0, 100%);
  }
`;

// Styled components
const LoaderContainer = styled.div`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Boxes = styled.div`
  --size: 20px;
  --duration: 1000ms;
  height: calc(var(--size) * 3);
  width: calc(var(--size) * 2);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: var(--size);
  height: var(--size);
  top: 0;
  left: 0;
  position: absolute;
  transform-style: preserve-3d;

  &:nth-of-type(1) {
    transform: translate(100%, 100%);
    animation: ${box1} var(--duration) linear infinite;
  }
  &:nth-of-type(2) {
    transform: translate(0, 0);
    animation: ${box2} var(--duration) linear infinite;
  }
  &:nth-of-type(3) {
    transform: translate(0, 100%);
    animation: ${box3} var(--duration) linear infinite;
  }
  &:nth-of-type(4) {
    transform: translate(100%, 200%);
    animation: ${box4} var(--duration) linear infinite;
  }
`;

const DivCommon = styled.div`
  --background: #c9c9c9;
  --top: auto;
  --right: auto;
  --bottom: auto;
  --left: auto;
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
    translateZ(var(--translateZ));

  &:nth-of-type(1) {
    --top: 0;
    --left: 0;
    background-color: #ffc7c5;
  }
  &:nth-of-type(2) {
    --background: #f9726c;
    --right: 0;
    --rotateY: 90deg;
  }
  &:nth-of-type(3) {
    --background: #ed3b3b;
    --rotateX: -90deg;
  }
  &:nth-of-type(4) {
    --background: rgba(197, 24, 0, 0.2);
    filter: blur(5px);
    --top: 0;
    --left: 0;
    --translateZ: calc(var(--size) * 1.8 * -1);
  }
`;

// Loader Component
const Loader = () => {
  const arr = new Array(4).fill(0);

  return (
    <LoaderContainer>
      <Boxes>
        {arr.map((_, index) => (
          <Box key={index}>
            {arr.map((_, index) => (
              <DivCommon key={index} />
            ))}
          </Box>
        ))}
      </Boxes>
    </LoaderContainer>
  );
};

export default Loader;
