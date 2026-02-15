import React, { useState } from 'react';

export default function SponsorsAdmin({ data, onSave }) {
  const [sponsors, setSponsors] = useState(data.sponsors || []);
  const [newSponsor, setNewSponsor] = useState({
    id: '',
    nombre: '',
    logo: '',
    link: '',
  });
  const [editingSponsorId, setEditingSponsorId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSponsor({ ...newSponsor, [name]: value });
  };

  const generateId = () => {
    return 's' + Math.random().toString(36).substr(2, 9);
  };

  const handleAddSponsor = () => {
    if (newSponsor.nombre && newSponsor.logo) {
      const updatedSponsors = [...sponsors, { ...newSponsor, id: generateId() }];
      setSponsors(updatedSponsors);
      onSave({ ...data, sponsors: updatedSponsors });
      setNewSponsor({ id: '', nombre: '', logo: '', link: '' });
    }
  };

  const handleEditClick = (sponsor) => {
    setEditingSponsorId(sponsor.id);
    setNewSponsor({ ...sponsor });
  };

  const handleUpdateSponsor = () => {
    if (newSponsor.nombre && newSponsor.logo && editingSponsorId) {
      const updatedSponsors = sponsors.map((s) =>
        s.id === editingSponsorId ? { ...newSponsor } : s
      );
      setSponsors(updatedSponsors);
      onSave({ ...data, sponsors: updatedSponsors });
      setNewSponsor({ id: '', nombre: '', logo: '', link: '' });
      setEditingSponsorId(null);
    }
  };

  const handleDeleteSponsor = (id) => {
    const updatedSponsors = sponsors.filter((s) => s.id !== id);
    setSponsors(updatedSponsors);
    onSave({ ...data, sponsors: updatedSponsors });
  };

  return (
    <div className='p-6 bg-slate-800 rounded-lg shadow-lg text-white'>
      <h2 className='text-3xl font-bold mb-6 text-emerald-400'>Administrar Auspiciadores</h2>

      <div className='mb-8 p-4 bg-slate-700 rounded-md'>
        <h3 className='text-xl font-semibold mb-4'>{editingSponsorId ? 'Editar Auspiciador' : 'Agregar Nuevo Auspiciador'}</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label htmlFor='nombre' className='block text-sm font-medium text-gray-300'>Nombre del Auspiciador</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              value={newSponsor.nombre}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md bg-slate-900 border-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500'
              placeholder='Nombre de la marca'
            />
          </div>
          <div>
            <label htmlFor='logo' className='block text-sm font-medium text-gray-300'>URL del Logo</label>
            <input
              type='text'
              id='logo'
              name='logo'
              value={newSponsor.logo}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md bg-slate-900 border-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500'
              placeholder='e.g., /assets/logos/sponsor_ejemplo.svg'
            />
          </div>
          <div className='md:col-span-2'>
            <label htmlFor='link' className='block text-sm font-medium text-gray-300'>URL del Sitio Web (Opcional)</label>
            <input
              type='text'
              id='link'
              name='link'
              value={newSponsor.link}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md bg-slate-900 border-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500'
              placeholder='e.g., https://www.marcadeportiva.com'
            />
          </div>
        </div>
        {editingSponsorId ? (
          <button
            onClick={handleUpdateSponsor}
            className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800'
          >
            Actualizar Auspiciador
          </button>
        ) : (
          <button
            onClick={handleAddSponsor}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800'
          >
            Agregar Auspiciador
          </button>
        )}
        {editingSponsorId && (
          <button
            onClick={() => {
              setEditingSponsorId(null);
              setNewSponsor({ id: '', nombre: '', logo: '', link: '' });
            }}
            className='ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-slate-800'
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <div>
        <h3 className='text-xl font-semibold mb-6 flex items-center gap-2'>
          <span>📋 Lista de Auspiciadores</span>
          <span className="text-sm font-normal text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">{sponsors.length}</span>
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className='bg-slate-700/40 border border-slate-700 rounded-xl p-4 hover:bg-slate-700/60 transition-all group'>
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center border border-slate-600 shadow-sm overflow-hidden">
                  <img src={sponsor.logo} alt={sponsor.nombre} className='max-w-full max-h-full object-contain' />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(sponsor)}
                    className='p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors'
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteSponsor(sponsor.id)}
                    className='p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors'
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div>
                <h4 className='font-bold text-lg text-white mb-1'>{sponsor.nombre}</h4>
                {sponsor.link ? (
                  <a
                    href={sponsor.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-emerald-400 hover:underline flex items-center gap-1'
                  >
                    <span>🔗</span> {new URL(sponsor.link).hostname}
                  </a>
                ) : (
                  <span className="text-sm text-slate-500 italic">Sin enlace</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {sponsors.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
            <p className="text-slate-400 italic">No hay auspiciadores registrados aún.</p>
          </div>
        )}
      </div>
    </div>
  );
}
