import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteEmployerModal = ({
  open,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                <AlertTriangle
                  size={28}
                  className="text-red-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  Delete Employer

                </h2>

                <p className="text-sm text-slate-500">

                  This action cannot be undone.

                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <X size={20} />
            </button>

          </div>

          {/* Body */}

          <div className="px-6 py-8">

            <p className="text-center text-slate-600 leading-7">

              Are you sure you want to permanently delete this
              employer account?

            </p>

            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4">

              <p className="text-sm text-red-700">

                Deleting this employer may remove associated
                recruiter information and cannot be reversed.

              </p>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t p-6">

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />

              Delete Employer

            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default DeleteEmployerModal;