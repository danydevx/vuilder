<template>
  <div class="page-calendars">
    <PageNav sticky />
    <SectionCalendar
      id="section-calendar-1"
      
      title="Agenda tu consulta"
      subtitle="Selecciona fecha y horario disponibles para platicar sobre tu proyecto web."
      :enableOverlay="true"
      backgroundImg="https://placehold.co/1200x800/jpg?text=Calendario+Fondo"
      :config="calendarConfig"
      
      sendBy="whatsapp"
    />

    <SectionCalendar1
      id="section-calendar-2"
 
      title="Horario semanal"
      subtitle="Selecciona un día de esta semana para agendar tu consulta."
      :enableOverlay="false"
      backgroundImg="https://placehold.co/1200x800/jpg?text=Calendario+Semanal"
      :config="calendarConfig"
      sendBy="email"  
    />

  <SectionCalendar2
   id="section-calendar-3"
   title="Agenda tu consulta"
   subtitle="Elige una fecha y confirma tus datos para agendar una reunión sobre tu proyecto."
   :enableOverlay="true"
   backgroundImg="https://placehold.co/1200x800/jpg?text=Calendario+Tipo+Calendly"
   :daysVisible="14"
   :config="calendarConfig"
   sendBy="email"    
/>
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionCalendar from '@/sections/calendars/SectionCalendar.vue'
import SectionCalendar1 from '@/sections/calendars/SectionCalendar1.vue'
import SectionCalendar2 from '@/sections/calendars/SectionCalendar2.vue'

const businessSchedule = {
  monday:    { open: '09:00', close: '18:00' },
  tuesday:   { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday:  { open: '09:00', close: '18:00' },
  friday:    { open: '09:00', close: '18:00' },
  saturday:  { open: '10:00', close: '14:00' },
  sunday:    null
}

function generateMonthlyAvailability(daysAhead = 30) {
  const today = new Date()
  const data = {}

  for (let i = 1; i <= daysAhead; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)

    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const schedule = businessSchedule[dayName]
    if (!schedule) continue

    const openH = parseInt(schedule.open.split(':')[0])
    const closeH = parseInt(schedule.close.split(':')[0])
    const slots = []

    for (let h = openH; h < closeH; h++) {
      const label = `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`
      slots.push(label)
    }

    if (slots.length) {
      const key = d.toISOString().split('T')[0]
      data[key] = slots
    }
  }

  return data
}

const backendDays = generateMonthlyAvailability(30)
const bookedSlots = new Map()

const bookedDay = Object.keys(backendDays)[1]
bookedSlots.set(bookedDay, new Set(['10:00 AM', '2:00 PM', '4:00 PM']))

async function mockCheckAvailability(date, time) {
  await new Promise(r => setTimeout(r, 150))
  const taken = bookedSlots.get(date)?.has(time)
  return !taken
}
async function mockBookSlot(date, time) {
  await new Promise(r => setTimeout(r, 200))
  if (!bookedSlots.has(date)) bookedSlots.set(date, new Set())
  bookedSlots.get(date).add(time)
  return true
}
async function mockGetBookedSlots(date) {
  await new Promise(r => setTimeout(r, 100))
  return Array.from(bookedSlots.get(date) ?? [])
}

const calendarConfig = {
  minDaysAhead: 1,
  availableDays: Object.entries(backendDays)
    .filter(([day, slots]) => slots.length > 0)
    .map(([day]) => day),
  subjects: ['Consulta de proyecto', 'Reunión técnica', 'Revisión de avance'],
  extraFields: {
    email: { name: 'Correo electrónico', type: 'email', required: true }
  },
  generateTimeSlotsForDate(date) {
    return backendDays[date] || []
  },
  async checkAvailability(date, time) {
    return await mockCheckAvailability(date, time)
  },
  async reserveSlot(date, time) {
    return await mockBookSlot(date, time)
  },
  async getBookedSlots(date) {
    return await mockGetBookedSlots(date)
  }
}
</script>
