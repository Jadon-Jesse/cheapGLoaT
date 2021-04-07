<!-- PROJECT LOGO -->
<p align="center">
    <h1 align="center">CheapGLoaT React App</h1>
    <p align="center">
        <a href="https://jadon-jesse.github.io/cheapGLoaT/">
            <img src="https://github.com/Jadon-Jesse/cheapGLoaT/blob/master/assets/cheapGLoaTHome.PNG?raw=true" alt="Logo">
        </a>
    </p>


  <p align="center">
    A decentralized link aggregation system built on the cheapEthereum network and hosted for free on github.io
    <br />
    <a href="https://jadon-jesse.github.io/cheapGLoaT/"><strong>Visit website »</strong></a>
    <br />
    <br />
  </p>
</p>

## About
The application front end is a simple web app written in React.js which allows users to interface with the actual cheapGLoaT contract sitting on the cheapETH network

## FAQ
* **Q: How does the prize pool work again?**
    * **A:** The prize pool for a given round is equal to the total value of the upvotes across all submissions, in that round. i.e If the total number of upvotes for a round is at 100, then the prize pool for that round will be 50CTH
* **Q: Why don't down-votes count towards the prize pool?**
    * **A:** Because we want to try and de-incentivize shit posting
* **Q: Why does it take so long to load?**
    * **A:** The application gets it's data directly from the cheapETH blockchain. There are no "traditional servers" sitting between the front-end application and the cheapGLoaT contract. So while this type of system architecture allows us to build some interesting decentralized applications, the speed at which these applications run are much much slower than "traditional server" based applications 

## TODO
* Add pagination to the GLoaT tab