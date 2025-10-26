export const CATEGORY_MAP = {
  faith: {
    label: 'Faith & Spirituality',
    description: 'Stories and reflections on faith, prayer, and spiritual growth.',
  },
  life: {
    label: 'Life Lessons',
    description: 'Practical insights from everyday moments and challenges.',
  },
  reflection: {
    label: 'Personal Reflection',
    description: 'Thoughtful musings on identity, purpose, and gratitude.',
  },
  books: {
    label: 'Book Reviews',
    description: 'Notes and takeaways from books currently on the shelf.',
  },
  random: {
    label: 'Random Thoughts',
    description: 'Unexpected ideas, conversations, and observations.',
  },
}

export const CATEGORY_LIST = Object.entries(CATEGORY_MAP).map(([slug, value]) => ({
  slug,
  ...value,
}))

export function formatDate(value) {
  if (!value) {
    return '—'
  }

  try {
    if (typeof value.toDate === 'function') {
      return value.toDate().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    const date = value.seconds ? new Date(value.seconds * 1000) : new Date(value)
    if (Number.isNaN(date.getTime())) {
      return '—'
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (error) {
    console.error('Failed to format date', error)
    return '—'
  }
}

export function createTagPills(container, tags = []) {
  container.innerHTML = ''
  if (!Array.isArray(tags) || tags.length === 0) {
    return
  }

  tags.forEach((tag) => {
    const pill = document.createElement('span')
    pill.className = 'tag-pill'
    pill.textContent = `#${tag}`
    container.appendChild(pill)
  })
}
