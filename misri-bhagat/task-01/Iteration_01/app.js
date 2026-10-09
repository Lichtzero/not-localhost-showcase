/**
 * MAIN SHOWCASE APPLICATION
 * ==============================================================================
 * Orchestrates 3D cosmos, folder archive grid, search modal, project drawer,
 * sound synthesis, and real file navigation for the collective class showcase.
 * ==============================================================================
 */

import { STUDENTS, THEMES, getStudentById, filterStudentsByTheme, searchStudents } from './studentsData.js';
import { World3D } from './world3d.js';

// Sound Synthesis using Web Audio API
class AudioFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playChime(freq = 440, type = 'sine', duration = 0.4) {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  hover() {
    this.playChime(520, 'sine', 0.15);
  }

  select() {
    this.playChime(660, 'triangle', 0.35);
  }

  filter() {
    this.playChime(380, 'sine', 0.25);
  }
}

class ShowcaseApp {
  constructor() {
    this.audio = new AudioFX();
    this.currentMode = '3d'; // '3d' | 'archive'
    this.currentTheme = 'ALL';
    this.activeStudent = null;
    this.world3d = null;

    // DOM Elements
    this.canvasContainer = document.getElementById('canvas-container');
    this.tooltip = document.getElementById('canvas-tooltip');
    this.archiveContainer = document.getElementById('archive-container');
    this.archiveGrid = document.getElementById('archive-grid');
    this.projectDrawer = document.getElementById('project-drawer');
    this.drawerBackdrop = document.getElementById('drawer-backdrop');
    this.directoryModal = document.getElementById('directory-modal');
    this.directoryList = document.getElementById('directory-list');
    this.heroStage = document.getElementById('hero-stage');

    this.init();
  }

  init() {
    // 1. Initialize 3D World
    this.world3d = new World3D(
      this.canvasContainer,
      STUDENTS,
      (student) => this.openProjectDrawer(student),
      (student, coords) => this.handleHoverStudent(student, coords)
    );

    // 2. Render UI Components
    this.renderThemePills();
    this.renderFolderArchive();
    this.renderDirectoryList(STUDENTS);

    // 3. Bind UI Events
    this.bindEvents();

    // 4. Update HUD Counter
    document.getElementById('hud-total-count').textContent = STUDENTS.length;
    document.getElementById('hud-live-count').textContent = STUDENTS.filter(s => s.hasLiveDemo).length;
  }

  renderThemePills() {
    const container = document.getElementById('theme-fragments-container');
    if (!container) return;

    container.innerHTML = THEMES.map(theme => `
      <button class="fragment-pill ${theme.id === this.currentTheme ? 'active' : ''}" 
              data-theme-id="${theme.id}"
              style="color: ${theme.color};">
        <span class="pill-dot"></span>
        <span>${theme.label}</span>
      </button>
    `).join('');
  }

  renderFolderArchive(filterTheme = 'ALL') {
    if (!this.archiveGrid) return;
    const list = filterStudentsByTheme(filterTheme);

    this.archiveGrid.innerHTML = list.map(student => `
      <div class="folder-card" data-student-id="${student.id}">
        <!-- Tab -->
        <div class="folder-tab" style="background-color: ${student.folderColor}; border-top: 2px solid ${student.folderAccent};">
          ${student.id.toUpperCase().slice(0, 10)}
        </div>

        <!-- Folder Jacket -->
        <div class="folder-body" style="background: linear-gradient(145deg, ${student.folderColor} 0%, #ffffff 100%);">
          <!-- Peeking document inside -->
          <div class="folder-paper">
            <div class="folder-paper-header">
              <span class="folder-id-stamp">ID // 0${student.islandIndex}</span>
              <span class="folder-status-badge ${student.hasLiveDemo ? 'live' : 'archive'}">
                ${student.hasLiveDemo ? '● Live Demo' : '○ Archive'}
              </span>
            </div>
            <h3 class="folder-student-name">${student.name}</h3>
            <p class="folder-project-title">${student.projectTitle}</p>
          </div>

          <!-- Bottom Meta & Actions -->
          <div class="folder-bottom-meta">
            <div class="folder-tag-list">
              ${student.themes.map(t => `<span class="folder-tag">${t}</span>`).join('')}
            </div>
            <button class="folder-open-btn" data-action="inspect" data-student-id="${student.id}">
              Inspect Universe Space ➔
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderDirectoryList(students) {
    if (!this.directoryList) return;

    this.directoryList.innerHTML = students.map(student => `
      <div class="directory-item" data-student-id="${student.id}">
        <div class="dir-left">
          <span class="dir-index">${String(student.islandIndex).padStart(2, '0')}</span>
          <div>
            <div class="dir-name">${student.name} <span style="font-size:12px;color:#60a5fa;font-family:var(--font-mono)">@${student.handle}</span></div>
            <div class="dir-title">${student.projectTitle}</div>
          </div>
        </div>
        <div class="dir-right">
          <span class="drawer-badge" style="background: ${student.accentColor}20; color: ${student.accentColor};">
            ${student.hasLiveDemo ? 'LIVE DEMO' : 'ARCHIVE FOLDER'}
          </span>
          <span style="color:var(--text-sub);font-size:14px;">➔</span>
        </div>
      </div>
    `).join('');
  }

  handleHoverStudent(student, coords) {
    if (!student) {
      this.tooltip.classList.remove('visible');
      return;
    }

    this.audio.hover();
    this.tooltip.style.left = `${coords.x}px`;
    this.tooltip.style.top = `${coords.y}px`;

    document.getElementById('tt-badge').textContent = student.hasLiveDemo ? 'Interactive Prototype' : 'Archive Space';
    document.getElementById('tt-badge').style.background = `${student.accentColor}25`;
    document.getElementById('tt-badge').style.color = student.accentColor;

    document.getElementById('tt-name').textContent = student.name;
    document.getElementById('tt-project').textContent = student.projectTitle;

    this.tooltip.classList.add('visible');
  }

  openProjectDrawer(student) {
    if (!student) return;
    this.activeStudent = student;
    this.audio.select();

    // Fill Drawer Content
    document.getElementById('drawer-badge').textContent = student.category;
    document.getElementById('drawer-badge').style.background = `${student.accentColor}25`;
    document.getElementById('drawer-badge').style.color = student.accentColor;

    document.getElementById('drawer-student-name').textContent = student.name;
    document.getElementById('drawer-handle').textContent = `@${student.handle} • Station 0${student.islandIndex}`;
    document.getElementById('drawer-project-title').textContent = student.projectTitle;
    document.getElementById('drawer-tagline').textContent = `“${student.tagline}”`;
    document.getElementById('drawer-abstract').textContent = student.abstract;

    // Tech pills
    const techBox = document.getElementById('drawer-tech-pills');
    techBox.innerHTML = student.techStack.map(t => `<span class="drawer-tech-pill">${t}</span>`).join('');

    // Primary Links
    const linksBox = document.getElementById('drawer-links-box');
    let linksHtml = '';

    if (student.hasLiveDemo && student.liveUrl) {
      linksHtml += `
        <a href="${student.liveUrl}" class="launch-live-btn" target="_blank" rel="noopener">
          <span>🚀 Launch Live Demo</span>
          <span style="font-size: 11px; opacity: 0.85;">(${student.liveUrl})</span>
        </a>
      `;
    }

    linksHtml += `
      <a href="${student.folderUrl}" class="folder-link-btn" target="_blank" rel="noopener">
        <span>📁 Open Project Folder:</span>
        <code style="font-family:var(--font-mono);font-size:11px;color:#93c5fd;">${student.folderUrl}</code>
      </a>
    `;

    if (student.secondaryUrls && student.secondaryUrls.length > 0) {
      linksHtml += `<div style="margin-top: 6px; font-size: 11px; font-family: var(--font-mono); color: var(--text-sub);">COMPANION ARTIFACTS:</div>`;
      student.secondaryUrls.forEach(sec => {
        linksHtml += `
          <a href="${sec.url}" class="folder-link-btn" style="padding: 7px 12px; font-size: 11.5px;" target="_blank" rel="noopener">
            <span>📄 ${sec.label}</span>
          </a>
        `;
      });
    }

    linksBox.innerHTML = linksHtml;

    // Show Drawer
    this.projectDrawer.classList.add('active');
    this.drawerBackdrop.classList.add('active');
  }

  closeProjectDrawer() {
    this.projectDrawer.classList.remove('active');
    this.drawerBackdrop.classList.remove('active');
  }

  setThemeFilter(themeId) {
    this.currentTheme = themeId;
    this.audio.filter();

    // Update pill states
    document.querySelectorAll('.fragment-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.themeId === themeId);
    });

    // Update 3D world
    if (this.world3d) {
      this.world3d.setFilter(themeId);
    }

    // Update Folder view
    this.renderFolderArchive(themeId);
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.audio.select();

    const isArchive = (mode === 'archive');
    this.archiveContainer.classList.toggle('active', isArchive);
    this.heroStage.classList.toggle('minimized', isArchive);

    document.getElementById('view-btn-3d').classList.toggle('active', !isArchive);
    document.getElementById('view-btn-archive').classList.toggle('active', isArchive);
  }

  bindEvents() {
    // 1. Theme Fragment Filters
    document.addEventListener('click', (e) => {
      const pill = e.target.closest('.fragment-pill');
      if (pill) {
        const themeId = pill.dataset.themeId;
        this.setThemeFilter(themeId);
      }
    });

    // 2. View Switchers
    document.getElementById('view-btn-3d').addEventListener('click', () => this.switchMode('3d'));
    document.getElementById('view-btn-archive').addEventListener('click', () => this.switchMode('archive'));

    // 3. Audio Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    soundBtn.addEventListener('click', () => {
      const on = this.audio.toggle();
      soundBtn.textContent = on ? '🔊' : '🔇';
      soundBtn.title = on ? 'Sound Effects Active' : 'Sound Muted';
    });

    // 4. Color Theme Toggle (Dark vs Warm Cream)
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      themeBtn.textContent = next === 'light' ? '🌙' : '☀️';
    });

    // 5. Drawer Controls
    document.getElementById('drawer-close-btn').addEventListener('click', () => this.closeProjectDrawer());
    this.drawerBackdrop.addEventListener('click', () => this.closeProjectDrawer());

    // Drawer Prev / Next Navigation
    document.getElementById('drawer-prev-btn').addEventListener('click', () => {
      if (!this.activeStudent) return;
      const idx = STUDENTS.findIndex(s => s.id === this.activeStudent.id);
      const prevIdx = (idx - 1 + STUDENTS.length) % STUDENTS.length;
      const prevStudent = STUDENTS[prevIdx];
      this.openProjectDrawer(prevStudent);
      if (this.world3d) this.world3d.focusOnStudent(prevStudent.id);
    });

    document.getElementById('drawer-next-btn').addEventListener('click', () => {
      if (!this.activeStudent) return;
      const idx = STUDENTS.findIndex(s => s.id === this.activeStudent.id);
      const nextIdx = (idx + 1) % STUDENTS.length;
      const nextStudent = STUDENTS[nextIdx];
      this.openProjectDrawer(nextStudent);
      if (this.world3d) this.world3d.focusOnStudent(nextStudent.id);
    });

    // 6. Folder Card Clicks in Archive View
    this.archiveGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.folder-card');
      if (card) {
        const studentId = card.dataset.studentId;
        const student = getStudentById(studentId);
        if (student) this.openProjectDrawer(student);
      }
    });

    // 7. Directory & Search Modal
    const openDirBtn = document.getElementById('directory-trigger-btn');
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const closeDirBtn = document.getElementById('directory-close-btn');
    const searchInput = document.getElementById('directory-search-input');

    const openSearch = () => {
      this.directoryModal.classList.add('active');
      searchInput.value = '';
      this.renderDirectoryList(STUDENTS);
      setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
      this.directoryModal.classList.remove('active');
    };

    if (openDirBtn) openDirBtn.addEventListener('click', openSearch);
    if (searchTriggerBtn) searchTriggerBtn.addEventListener('click', openSearch);
    if (closeDirBtn) closeDirBtn.addEventListener('click', closeSearch);

    this.directoryModal.addEventListener('click', (e) => {
      if (e.target === this.directoryModal) closeSearch();
    });

    searchInput.addEventListener('input', (e) => {
      const filtered = searchStudents(e.target.value);
      this.renderDirectoryList(filtered);
    });

    this.directoryList.addEventListener('click', (e) => {
      const item = e.target.closest('.directory-item');
      if (item) {
        const studentId = item.dataset.studentId;
        const student = getStudentById(studentId);
        if (student) {
          closeSearch();
          this.openProjectDrawer(student);
          if (this.world3d) this.world3d.focusOnStudent(student.id);
        }
      }
    });

    // 8. HUD Quick Actions
    document.getElementById('hud-reset-view').addEventListener('click', () => {
      if (this.world3d) this.world3d.resetView();
    });

    document.getElementById('hud-random-student').addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * STUDENTS.length);
      const randomStudent = STUDENTS[randomIndex];
      if (this.world3d) this.world3d.focusOnStudent(randomStudent.id);
      this.openProjectDrawer(randomStudent);
    });

    // 9. Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape') {
        this.closeProjectDrawer();
        closeSearch();
      }
    });
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new ShowcaseApp();
});
