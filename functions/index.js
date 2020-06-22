const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const addNotification = async notification => {
    const doc = await admin
        .firestore()
        .collection('notifications')
        .add(notification);
    return console.log('notification added', doc);
}

exports.projectCreated = functions
    .firestore
    .document('projects/{projectId}')
    .onCreate(doc => {
        const project = doc.data();
        const title = project.title;
        const author = project.author;

        const notification = {
            content: 'Added a new project!',
            title,
            user: author,
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }

        return addNotification(notification);
    })

exports.projectDeleted = functions
    .firestore
    .document('projects/{projectId}')
    .onDelete(doc => {
        const project = doc.data();
        const title = project.title;
        const author = project.author;

        const notification = {
            content: 'Deleted a project!',
            title,
            user: author,
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }

        return addNotification(notification);
    })

exports.projectUpdated = functions
    .firestore
    .document('projects/{projectId}')
    .onUpdate((change, context) => {
        const newValue = change
            .after
            .data();
        const oldValue = change
            .before
            .data();

        const title = oldValue.title;
        const author = oldValue.author;

        const oldTime = oldValue.totalTime;
        const newTime = newValue.totalTime

        if (newTime - oldTime != 0) {
            let content = newTime - oldTime > 0
                ? 'Clocked in a task!'
                : 'Deleted a task!';
            const notification = {
                content,
                title,
                user: author,
                time: admin
                    .firestore
                    .FieldValue
                    .serverTimestamp()
            }
            return addNotification(notification);
        }
    })

exports.clientCreated = functions
    .firestore
    .document('clients/{clinetId}')
    .onCreate(doc => {
        const client = doc.data();
        const title = client.name;
        const owner = client.owner;

        const notification = {
            content: 'Added a new client!',
            title,
            user: owner,
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }

        return addNotification(notification);
    })

exports.clientDeleted = functions
    .firestore
    .document('clients/{clinetId}')
    .onDelete(doc => {
        const client = doc.data();
        const title = client.name;
        const owner = client.owner;

        const notification = {
            content: 'Deleted a client!',
            title,
            user: owner,
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }

        return addNotification(notification);
    })

exports.tagCreated = functions
    .firestore
    .document('tags/{tagId}')
    .onCreate(doc => {
        const tag = doc.data();
        const title = tag.name;
        const owner = tag.owner;

        const notification = {
            content: 'Added a new tag!',
            title,
            user: owner,
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }

        return addNotification(notification);
    })

exports.tagDeleted = functions
    .firestore
    .document('tags/{tagId}')
    .onDelete(doc => {
        const tag = doc.data();
        const title = tag.name;
        const owner = tag.owner;

        const notification = {
            content: 'Deleted a tag!',
            title,
            user: owner,
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }

        return addNotification(notification);
    })