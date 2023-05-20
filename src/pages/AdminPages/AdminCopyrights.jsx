/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { getCopyrights } from '../../Api/adminApi';

function AdminCopyrights() {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getCopyrights();
      if (result.data.success) {
        setReports(result.data.reports);
      }
    };
    invoke();
  }, []);
  return (
    <div className="flex w-full h-screen bg-[#050423] p-2 gap-2 overflow-hidden">
      <div>
        <AdminSidebar />
      </div>
      <div className="w-[95vw] text-white rounded-md">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#be07bebb]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Song
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Artist
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Complaint By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Complaint
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200" />
                  {reports.map((rep) => (
                    <tr key={rep._id}>
                      <td>{rep.song?.name}</td>
                      <td>{rep.song?.artist}</td>
                      <td>
                        <ul>
                          {rep.complaint.map((comp) => (
                            <li key={comp._id}>{comp?.createdBy?.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {rep.complaint.map((comp) => (
                            <li key={comp._id}>{comp?.report}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminCopyrights;
