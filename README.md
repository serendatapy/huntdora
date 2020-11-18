# huntdora


Refactoring Ideas
MaterialUI: Refactoring - Make better use of 
makeStyles and Global Theme provider, in order to avoid repetitive inline css modifications where possible. 
Code Could also be modularized further into smaller components. 
Implementation of redux or a more clever use of local storage for state management: 
The main state that needs managing are the saved jobs, as if a job is saved on the results page, it needs to be reflected on the saved jobs page, and on the job details page. On all three pages the state must remain the same. At the moment this is managed by functions that change the state accordingly, but this solution is not very scalable.  
Probably the multitude of functions in App.jsx component can be moved to utility libraries or modularized. 
Probably some of the code for the rendering of the navbars, could be inserted in the components themselves, further cleaning up App.jsx
See notes in app-types
Styling:
JobDetails: The apply button was added at the last moment and needs to be placed correctly following the material ui grid system. 
in Nav.tsx probably the form can be modularized into a separate component that takes
props
Reliability and Robustness
BUG: Occassionally when sumitting query something happens, and there is an infinite loading loop. Not sure if this happens only in development. 
BUG: When saving during development, the huntdora icon next to the search bar multiplies itself. This happens because the destruction of the lottie file is not handled. I think this only happens during development, and shouldn't create a problem for the user. It would be good to solve it though. The destruction was left out to avoid the icon dissapearing during the use of the application. 
