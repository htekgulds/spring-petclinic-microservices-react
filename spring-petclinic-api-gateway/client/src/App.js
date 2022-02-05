import { Route, Routes } from 'react-router-dom'
import { WelcomePage } from './components/WelcomePage'
import { FindOwnersPage } from './components/owners/FindOwnersPage'
import { ListOwnersPage } from './components/owners/ListOwnersPage'
import { NotFoundPage } from './components/NotFoundPage'
import { VetsPage } from './components/vets/VetsPage'
import { ErrorPage } from './components/ErrorPage'
import { OwnerFormPage } from './components/owners/OwnerFormPage'
import { OwnerPage } from './components/owners/OwnerPage'
import { PetFormPage } from './components/pets/PetFormPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/owners/find" element={<FindOwnersPage />} />
      <Route path="/owners/new" element={<OwnerFormPage />} />
      <Route path="/owners/:id" element={<OwnerPage />} />
      <Route path="/owners/:id/edit" element={<OwnerFormPage />} />
      <Route path="/owners/:id/pets/new" element={<PetFormPage />} />
      <Route path="/owners/:id/pets/:petId/edit" element={<PetFormPage />} />
      <Route path="/owners" element={<ListOwnersPage />} />
      <Route path="/vets" element={<VetsPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
