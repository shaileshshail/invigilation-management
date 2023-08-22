import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { Home } from './components/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { Exam } from './components/Exam';
import Staff from './components/Staff';
import Classroom from './components/Classroom';
import ExamChild from './components/ExamChild';
import { ClassroomContextProvider } from './context/ClassroomContext';
import { StaffContextProvider } from './context/StaffContext';
import { ExamContextProvider } from './context/ExamContext';
import Registry from './components/Registry';
function App() {
  return (
    <>
      <UserAuthContextProvider>
        <ClassroomContextProvider>
          <StaffContextProvider>
            <ExamContextProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/home' element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path='/staff' element={<Staff />} />
              <Route path='/classroom' element={<Classroom />} />
              <Route path='/exam' element={<Exam />} />
              <Route path='/exam/:id' element={<ExamChild />} />
              <Route path='/registry' element={<Registry />} />
            </Routes>
            </ExamContextProvider>
          </StaffContextProvider>
        </ClassroomContextProvider>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
