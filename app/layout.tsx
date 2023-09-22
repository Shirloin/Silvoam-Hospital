/* eslint-disable react/jsx-no-undef */
import '../styles/globals.css'
import Navbar from './components/navbar'
import Background from './components/background'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Toaster } from 'react-hot-toast';
import { BedProvider } from './context/bedContext';
import { ActionProvider } from './context/actionContext';
import { PatientProvider } from './context/patientContext';
import { UserProvider } from './context/userContext';
import { MedicineProvider } from './context/medicineContext';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/authContext';
import { DriverProvider } from './context/driverContext';
import { RoomProvider } from './context/roomContext';
config.autoAddCss = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Toaster />
        <ToastContainer />
        <AuthProvider>
          <ActionProvider>
            <RoomProvider>
              <BedProvider>
                <UserProvider>
                  <MedicineProvider>
                    <DriverProvider>
                      <PatientProvider>
                        <Background />
                        <div className="min-h-screen relative z-20 w-full flex flex-col">
                          <Navbar />
                          {children}
                        </div>
                      </PatientProvider>
                    </DriverProvider>
                  </MedicineProvider>
                </UserProvider>
              </BedProvider>
            </RoomProvider>
          </ActionProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
