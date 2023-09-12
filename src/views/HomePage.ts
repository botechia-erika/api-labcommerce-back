export const HomePage =       `
<link "css/bootstrap.min.css" rel="stylesheet"/>
 <style>

 html {
     height: 100%;
     width: 100%;
     box-sizing: border-box;
     padding: 0;
     margin: 0;
 }
 
 :root {
     font-size: 16px;
     --light-300: #efefef;
     --dark-300: #2F302F;
     --light-400: #D9D9D9;
     --rounded-36: 36px;
     --dark-700: #242121;
     list-style-position: inside;
     list-style-padding: 0.5rem;
 }
 
 
 /* Resets */
 
 *,
 *::before,
 *::after {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
 }
 
 
 /* Base Style */
 
 body {
     background: var(--dark-300);
     font-family: "Open Sans", sans-serif;
     font-size: 1.5rem;
     display: block;
     padding: 1rem;
     min-height: 100vh;
     max-width: 1fr;
 }
 
 header {
     display: flex;
     flex-flow: column wrap;
     padding: 0.5rem;
     justify-content: space-around;
     color: rgb(255, 255, 255);
     font-size: 1.2rem;
 }
 
 *,
 *::after,
 *::before {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
 }
 
 :root {
     font-size: 16px;
     --principal-orange: #FCA555;
     --danger-fuchsia: #DE41C6;
     --primary-purple: #6320C7;
     --dark-100: #0C001C;
     --gray-100: #282836;
     --yellow-100: rgb(255, 248, 167);
 }
 
 .row{
     display: flex;
     flex-flow: row wrap;
 }
 body {
     display: block;
     padding: 1rem;
     outline: 2px solid black;
     font-family: 'Catamaran', sans-serif;
     background: var(--dark-100);
 }
 
 header.A1 {
     display: flex;
     flex-flow: row wrap;
     width: 50%;
     height: 100px;
     align-content: space-around;
     justify-content: space-around;
     background: var(--dark-100);
     color: snow;
 }
 
 .A1-a {
     display: flex;
     max-width: 250px;
     max-height: 70px;
     border-radius: 80px;
     object-fit: cover;
     align-content: center;
     justify-content: center;
     padding: 0.3rem;
 }
 
 .A1-b {}
 
 .A1-c {
     display: flex;
     flex-flow: row wrap;
     min-width: 90px;
     max-height: 70px;
     object-fit: cover;
     justify-content: space-around;
     align-content: center;
 }
 
 .span-A1-c {
     padding: .51rem;
     border-radius: 28px;
     margin: auto 10px;
     -webkit-border-radius: 28px;
     -moz-border-radius: 28px;
     -ms-border-radius: 28px;
     -o-border-radius: 28px;
 }
 
 .h1Title {
     color: gold;
 }
 
 .h1Title-White {
     color: white;
 }
 
 .span-A1-c:hover {
     border: 2px solid darkorange;
     background: gold;
     color: #000000;
 }
 
 .headerBox {
     display: flex;
     flex-flow: row wrap;
 }
 
 .brandLogo {
     border-radius: 50px;
 }
 
 input {
     font-size: 0.7rem;
 }
 
 .left-side {
     background-color: var(--dark-700);
 }
 
 .left-side button {
     border: 3.92px rgb(125, 123, 118) groove;
     border-radius: var(--rounded-36);
     -webkit-border-radius: var(--rounded-36);
     -moz-border-radius: var(--rounded-36);
     -ms-border-radius: var(--rounded-36);
     -o-border-radius: var(--rounded-36);
     background: var(--light-300);
     width: 80%;
     height: 33px;
     margin: 20px 8%;
 }
 
 .left-side button:hover {
     background: rgb(3, 1, 0);
     font-size: 1.4rem;
     color: white;
     weight: bolder;
 }
 
 main {
     color: rgb(254, 232, 232);
     padding: 2rem;
     background: #2F302F;
   overflow-x: hidden;
 }
 
 #main__section-1 {
     display: flex;
     flex-flow: row wrap;
     padding: 2rem;
     width: 100%;
 }
 
 .right-side {
     background: gold;
     margin: 30px;
     padding: 1rem;
     border-radius: var(--rounded-36);
 }
 
 footer p {
     color: gold;
 }
 
 .gold {
     color: gold;
 }
 
 
 /* Mobile Styles */
 
 .parent {
     min-height: 96vh;
     height: 100%;
     display: grid;
     grid-template-areas: "head" "left" "main" "right" "foot";
 }
 
 .parent>header,
 footer {
     display: flex;
     align-items: center;
 }
 
 header {
     grid-area: head;
 }
 
 .left-side {
     grid-area: left;
 }
 
 main {
     grid-area: main;
     overflow-y: scroll;
 }
 
 .right-side {
     grid-area: right;
 }
 
 footer {
     grid-area: foot;
     color: white;
     font-size: 1rem;
 }
 
 
 /* Tablet styles */
 
 @media screen and (min-width: 500px) {
     .parent {
         grid-template-columns: 0.5fr 1fr;
         grid-template-rows: 100px 1fr 1fr 50px;
         grid-template-areas: "head head" "left main" "right main" "foot foot";
     }
 }
 
 
 /* laptop and desktop styles */
 
 @media screen and (min-width: 960px) {
     .parent {
         max-height: 80vh;
         max-width: 0.8fr;
         margin: 0 auto;
         grid-template-columns: 173px 1fr 373px;
         grid-template-areas: "head head head" "left main right" "left main right" "foot foot foot";
         @media and (min-width: 920px) {
             min-height: 95vh;
             min-height: 95vh;
         }
     }
 }
 
 .article-products {
     width: 260px;
     height: 250px;
     background-color: #D9D9D9;
     margin: 20px auto;
     font-size: 1rem;
     padding: 1rem;
     border-radius: 26px;
     -webkit-border-radius: 26px;
     -moz-border-radius: 26px;
     -ms-border-radius: 26px;
     -o-border-radius: 26px;
 }
 
 
 </style>
 
 
 <header className='A1'>
 <h1>Documentação Labecommerce</h1>
 </header>

 <main className="container">
 <div className="row d-flex">
 <aside  className="col-12 col-md-5 col-lg-12">

 </aside>
 <section className="col-12 col-md-6 col-lg-10">
 <ul>
     <li>ENDPOINTS</li>

     <ul>
        <li>
            api<strong>ADMIN</strong>
                <ul>
                    <li>
                        <a href="./phones">GetAllPhones</a>
                    </li>
                </ul>
        </li>
     
     </ul>
 </ul>
 
 </section>
 </div>
 </main>


 `