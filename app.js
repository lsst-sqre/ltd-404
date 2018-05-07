let host = null;
let path = null;
if (/lsst\.io$/.exec(location.hostname)) {
  host = location.hostname;
  path = location.path;
} else {
  // When running from localhost (i.e, development), these are fallbacks.
  host = 'pipelines.lsst.io';
  path = '/v/not/here.html';
  console.log(`NOTE: testing mode with host ${host}`);
}

const getVersionUrl = (host, path) => {
  return `https://${host}/v`;
};

const getMainUrl = (host, path) => {
  return `https://${host}`;
};

const stripUrlProtocol = url => {
  return url.replace(/https:\/\//, '');
};

const buildSuggestionTr = (label, url) => {
  const linkLabel = stripUrlProtocol(url);
  return `
    <tr>
      <th scope="row">${label}</th>
      <td><a href="${url}">${linkLabel}</a></td>
    </tr>
  `;
};

// Insert suggestions into the page
const suggestions = document.querySelector('.c-suggestions-table');
suggestions.innerHTML =
  buildSuggestionTr('Other versions', getVersionUrl(host, path)) +
  buildSuggestionTr('Site homepage', getMainUrl(host, path)) +
  suggestions.innerHTML;
