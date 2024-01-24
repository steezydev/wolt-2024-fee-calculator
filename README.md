# Overview

-   Every component is covered by snapshot test
-   Only used libraries: react-day-picker and date-fns
-   Handcrafted inputs as a challange
-   No redux only react useState hook
-   Input components are indepent and stateless. Their functionality can be extended with HOCs
-   Avoid nested folder component structure (pros: easy access and overview of the components in alphabetic order; cons: might get croweded with too many variants)
-   Tests are next to component implementation -> easy to see if components are covered by tests (cons: folders might get crowded)
