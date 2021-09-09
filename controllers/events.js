const Event = require('../models/EventModel');

const getEvents = async (req, res) => {
    const events = await Event.find().populate('user', 'name')

    res.status(201).json({
        ok: true,
        events
    })
}

const createEvent = async (req, res) => {

    const event = new Event(req.body)

    try {
        event.user = req.uid

        const savedEvent = await event.save()

        res.status(201).json({
            ok: true,
            event: savedEvent
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'error saving an event'
        })
    }
}

const updateEvent = async (req, res) => {

    const eventId = req.params.id

    const uid = req.uid

    try {
        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found event'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have authorization to edit the event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.status(201).json({
            ok: true,
            event: updatedEvent
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Error on server... please await an moment'
        })
    }
}

const deleteEvent = async (req, res) => {

    const eventId = req.params.id

    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found event'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have authorization to delete the event'
            })
        }

        await Event.findByIdAndDelete(eventId)

        res.status(201).json({
            ok: true
        })


    } catch (err) {
        res.status(500).json({
            ok: true,
            msg: 'Error on server... please await an moment'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}