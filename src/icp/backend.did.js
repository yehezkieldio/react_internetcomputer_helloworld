export const idlFactory = ({ IDL }) => {
  const Main = IDL.Service({
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
