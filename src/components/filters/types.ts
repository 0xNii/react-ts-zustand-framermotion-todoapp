export type Routes =
  | {
      path: '/';
      name: 'All';
    }
  | { path: '/active'; name: 'Active' }
  | { path: '/completed'; name: 'Completed' };
