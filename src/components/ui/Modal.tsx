import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface IProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isOpen: boolean;
  close: () => void;
}

export default function Modal({
  children,
  title,
  description,
  isOpen,
  close,
}: IProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border "
          >
            {title && (
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-md text-black"
              >
                {title}
              </DialogTitle>
            )}
            {description && (
              <p className="mt-2 text-md text-gray-500">{description}</p>
            )}
            <div className="mt-4">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
