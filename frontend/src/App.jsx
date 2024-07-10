import { useState } from 'react'
import Header from '../components/layout/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/permission/login'
import Register from '../components/permission/registor'
import JobList from '../components/jobs/list'
import JobDetail from '../components/jobs/detail'
import CreateJob from '../components/jobs/create'
import EditJobform from '../components/jobs/edit'
import JobLists from '../components/jobs/joblist'; // Component to display job listings for employers
import Application from '../components/jobs/application'; // Component for job seekers to apply for job

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Header />
    <div className="container">
        <Routes>
        <Route path="/joblist" element={<JobLists />} />
        <Route path="/application" element={<Application />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/jobs/edit/:id" element={<EditJobform />} />
          <Route path="/jobs/:id" element={<JobDetail />} /> 
         <Route exact path="/jobs/add" render={() => <JobForm mode="add" />} />
         <Route exact path="/jobs/edit/:id" render={(props) => <JobForm mode="edit" {...props} />} />
          
        </Routes>
      </div>
  </Router>
  )
}

export default App
