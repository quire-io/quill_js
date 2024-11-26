import LinkBlot from 'quill/formats/link';

export default class Link extends LinkBlot {
    static create(value) {
        const title = value.title,
            url = typeof value === 'string' ? value: value.url,
            node = super.create(url);

        if (title)
            node.setAttribute('title', title);

        node.className = 'ql-link'; // Add class so we can distinguish this blot later
        return node;
    }

    static formats(node) {
        const url = node.getAttribute('href'),
            title = node.getAttribute('title');
        return title ? {url: url, title: title}: url;
    }
}