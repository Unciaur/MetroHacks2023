
export default function Home(){

    return <div>
        
<section className="hero">
  <img src={process.env.PUBLIC_URL+"/logo.png"} alt="Logo"/>
    <h1>Let's Sign!</h1>
    <p>An online ASL interpreter.</p>
    <p>Created by Julian, Aaron, Sudha.</p>
    <a href="https://github.com/Unciaur/MetroHacks2023" className="linkk">GitHub Repository</a>
</section>
  </div>
}