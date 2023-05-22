export const configGetWithToken = (url) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'get',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localUser?.token}`
    }
  };
};

export const configGet = (url) => ({
  method: 'get',
  url,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const configPatchWithToken = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'patch',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localUser?.token}`
    },
    data: databody
  };
};

export const configPostWithToken = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localUser?.token}`
    },
    data: databody
  };
};

export const configPostFileXlsx = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="Response.xlsx"',
      Authorization: `Bearer ${localUser.token}`
    },
    data: databody
  };
};

export const configPostFileDocx = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Response.docx"',
      Authorization: `Bearer ${localUser.token}`
    },
    data: databody
  };
};
export const configPostFilePdf = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Response.pdf"',
      Authorization: `Bearer ${localUser.token}`
    },
    data: databody
  };
};

export const configPutWithToken = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'put',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localUser?.token}`
    },
    data: databody
  };
};

export const configDeleteWithToken = (url) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'delete',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localUser?.token}`
    }
  };
};
