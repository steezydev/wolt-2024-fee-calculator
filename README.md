# Wolt Summer 2024 Engineering Internships Project

## Setup

1. Install dependencies by running `yarn install` or `npm install`
2. Run project by `yarn dev` or `npm run dev`
3. Run test by `yarn test` or `npm run test`
4. Build application by `yarn build` or `npm run build`

## Overview

The project is implemented with React, Typescript, styled with TailwindCSS and uses `date-fns` as an industry standard for date manipulations and `react-datepicker` due to complexity of the calendar component.

I focused on building most components from scratch to ensure full control over accessibility, styling, and functionality.

## State Management

Considering the app's size, I opted out of Redux, using a custom `useInput` hook for centralized state management in input components. Such approach still allows later integration of `Redux` with minimal changes.

## Structure & Naming

File structure is kept as simple as possible to allow easy navigation and overview of the project. CamelCase is used throughout the project as an industry standard.

## Accessibility

The application is following ARIA guidelines and was thoroughly tested with Google’s Lighthouse extension Firefox's accessibility dev tool ensuring the app's accessibility.

## Testing & Types

The project has 100% test coverage across components, helpers, HOCs, and hooks, combining snapshot tests with functional tests to prevent regressions. All component have their props interfaces separated from implementation inside `src/types/props` directory for easy access and centralization.

## Components

Focusing on component reusability and future scalability, generic components (e.g., buttons, inputs) come in unstyled versions for easy extension and styling. While more complex components like `DatePicker` or `DeliveryFeeForm` are including smaller atomic components into a desired structure. And big components (e.g `TimeSelector`) are broken down into logical parts in different files to allow better code readability and maintainability.

## Special mention: DatePicker

I'd like to specifically highlight the `DatePicker` component which features date input autocompletion, a popup calendar, and a visual time selector.

## Words of gratitude

A heartfelt thanks to the Wolt Team for this engaging challenge! Building this project was a great opportunity to learn a lot about React, testing and particularly accessibility which also happens to be my bachelor’s thesis subject.

Thank you very much! 💙
