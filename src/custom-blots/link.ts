import LinkBlot from 'quill/formats/link';

export default class Link extends LinkBlot {
    static className = 'ql-link'; // Add class so we can distinguish this blot later
}