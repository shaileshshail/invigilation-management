import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import { Home } from './components/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { Exam } from './components/Exam';
import Staff from './components/Staff';
import Classroom from './components/Classroom';
import ExamChild from './components/ExamChild';
import Registry from './components/Registry';
import Unauthorized from './components/Unauthorized';
import { useUserAuth } from './context/UserAuthContext';
import { ClassroomContextProvider } from './context/ClassroomContext';
import { StaffContextProvider } from './context/StaffContext';
import { ExamContextProvider } from './context/ExamContext';
import { UserAuthContextProvider } from './context/UserAuthContext';
const ROLES = {
  'User': 'staff',
  'Registry': 'registry',
  'Admin': 'admin'
}

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <ClassroomContextProvider>
          <StaffContextProvider>
            <ExamContextProvider>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route element={<ProtectedRoute  allowedRoles={[ROLES.Admin]} />}>
                  <Route path='/home' element={<Home />} />
                  <Route path='/staff' element={<Staff />} />
                  <Route path='/classroom' element={<Classroom />} />
                  <Route path='/exam' element={<Exam />} />
                  <Route path='/exam/:id' element={<ExamChild />} />
                </Route>

                <Route element={<ProtectedRoute  allowedRoles={[ROLES.Registry]} />} >
                  <Route path='/registry' element={<Registry />} />
                </Route>
              </Routes>
            </ExamContextProvider>
          </StaffContextProvider>
        </ClassroomContextProvider>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
