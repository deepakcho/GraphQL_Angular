# SecureworkTest

This project is created with following folder structure.

app -
    component - 
        grid-wrapper - (binded to default route)
        search-user - (Always visible to user, Placed in app.component)
        visualization-wrapper - (binded to **/visualize** route)
    model 
    shared
        bar-chart
        grid
    store


Steps to build the project: 
1. Open 'src/auth.ts', Assign generated PAT token to API_TOKEN variable
2. Install node modules, by running "npm i"
3. Run application by running "ng serve"