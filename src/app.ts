import { createQuill } from './main';

const quill = createQuill("#editor");

quill.on('text-change', () => {
    document.getElementById('debug')!.textContent =
        JSON.stringify(quill.getContents());
});

quill.setContents([
    {"insert": {"formula":"SUM(subtasks.duration, duration)"}},
    {"insert": "\n"},
    {"insert": "bold","attributes":{"style": "color: red; font-size: x-large;", "bold": true}},
    {"insert": {"divider": "hr"}},
    {"insert": {"mention": "@rudy"}},
    {"insert": " please look at this issue " },
    {"insert": {"autolink": "https://github.com/quire-io/"} },
    {"insert": " and "},
    {"insert": {"refer": "#897"} },
    {"insert": "\nHere is my email: "},
    {"insert": {"email": "info@quire.io"}},
    {"insert": " and phone number: "},
    {"insert": {"phone": "+1 (000) 000-0000"} },
    {"insert": "\n\n"},

    {"insert":"nested blockquote"},
    {"attributes":{
        "blockquote":true,
    },"insert":"\n"},
    {"insert":"nested blockquote"},
    {"attributes":{
        "nested-blockquote": 1,
    },"insert":"\n"},
    {"insert":"nested blockquote"},
    {"attributes":{
        "nested-blockquote": 2,
    },"insert":"\n"},

    {"insert": "After blockquote" },
]);