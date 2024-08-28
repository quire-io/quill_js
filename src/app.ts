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

    {"insert": {"mention": {"value": "@rudy", "name": "@rudy", "href": '/u/rudy'}}},

    {"insert": " please look at this issue " },

    {"insert": {"autolink": {"value": "https://github.com/quire-io/", 
            "href": "https://github.com/quire-io/"}} },
    {"insert": "\n"},
    {"insert": {"autolink": {"value": "https://github.com/quire-io/", 
            "href": "https://github.com/quire-io/", "name": "link name"}} },

    {"insert": " and "},

    {"insert": {"refer": {"value": "#897", "href": "/w/xx/897", "name": "#897 xx"}} },

    {"insert": "\nHere is my email: "},
    {"insert": {"email": "info@quire.io"}},
    {"insert": " and phone number: "},
    {"insert": {"phone": "+1 (000) 000-0000"} },
    {"insert": "\n\n"},

    {"attributes":{
        "link":"http://aa.aa",
    }, "insert":"link without title"},
    {"insert": "\n"},
    {"attributes":{
        "link": {
            "url":"http://aa.aa",
            "title": "link title"
        },
    }, "insert":"link with title"},
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
    {"insert": "\n"},
    {"insert": "color", attributes: {"color": "01"}},
    {"insert": " size", attributes: {"size": "02"}},
    {"insert": "\n"},
]);