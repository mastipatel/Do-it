import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';

function App() {
    return (
    <>
        <Navbar />
        <div className="container mt-5">
            <h1>Welcome to Do-it</h1>
            <p>Your one-stop solution for task management.</p>
            <p>Get started by signing in or signing up.</p>
            <Link href="/" className="btn btn-primary">Sign In</Link>
            <p>Don't have an account?</p>
            <Link href="/signup" className="btn btn-outline-primary">Sign Up</Link>
        </div>     
    </>
    );
}

export default App;