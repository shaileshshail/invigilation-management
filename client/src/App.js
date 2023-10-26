import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
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
import { Staffhome } from './components/Staffhome';
import { StaffHomeContextProvider } from './context/StaffHomeContext';
const ROLES = {
  'Staff': 'staff',
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
              <StaffHomeContextProvider>
              <Routes>

                <Route path='/' element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route element={<ProtectedRoute  allowedRoles={[ROLES.Admin]} />}>
                  <Route path='/staff' element={<Staff />} />
                  <Route path='/classroom' element={<Classroom />} />
                  <Route path='/exam' element={<Exam />} />
                  <Route path='/exam/:id' element={<ExamChild />} />
                </Route>
                <Route element={<ProtectedRoute  allowedRoles={[ROLES.Registry]} />} >
                  <Route path='/registry' element={<Registry />} />
                </Route>
                <Route element={<ProtectedRoute  allowedRoles={[ROLES.Staff]} />} >
                  <Route path='/staffhome' element={<Staffhome />} />
                </Route>

              </Routes>
              </StaffHomeContextProvider>
            </ExamContextProvider>
          </StaffContextProvider>
        </ClassroomContextProvider>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
