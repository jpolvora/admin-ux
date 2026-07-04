import React, { useState } from 'react';
import { Viewport, Region, Panel } from './framework/Layout';
import { Grid } from './framework/Grid';
import { Form, TextField, Button } from './framework/Form';
import { Window } from './framework/Window';
import './framework/theme.css';

function App() {
  const [showWindow, setShowWindow] = useState(false);
  const [activeSubnav, setActiveSubnav] = useState('Search');
  const [activeTabSouth, setActiveTabSouth] = useState('Tasks');
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchText, setSearchText] = useState('');

  // PVE Header representation
  const headerLogo = (
    <div className="pve-header-logo-container">
      {/* Proxmox stylized logo */}
      <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
        <path d="M10 20 L40 50 L10 80 Z" fill="#ff6600" />
        <path d="M90 20 L60 50 L90 80 Z" fill="#333333" />
        <path d="M40 50 L50 40 L60 50 L50 60 Z" fill="#ff6600" />
      </svg>
      <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '15px', color: '#1c1c1c', letterSpacing: '0.5px' }}>
        PROXMOX <span style={{ fontWeight: 'normal', fontSize: '12px', fontStyle: 'normal', color: '#555' }}>Virtual Environment 9.1.6</span>
      </span>
    </div>
  );

  // Left sidebar subnav items (for Datacenter view)
  const subnavItems = [
    { name: 'Search', icon: '🔍' },
    { name: 'Summary', icon: '📊' },
    { name: 'Notes', icon: '📝' },
    { name: 'Cluster', icon: '🖥️' },
    { name: 'Ceph', icon: '🐙' },
    { name: 'Options', icon: '⚙️' },
    { name: 'Storage', icon: '💾' },
    { name: 'Backup', icon: '🛡️' },
    { name: 'Replication', icon: '🔄' },
    { name: 'Permissions', icon: '🔑' },
    { name: 'HA', icon: '🛡️' },
    { name: 'SDN', icon: '🌐' },
    { name: 'Zones', icon: '🗺️' },
    { name: 'VNets', icon: '🔌' },
  ];

  // Grid columns matching screenshot exactly
  const gridColumns = [
    { text: 'Type', dataIndex: 'type', width: 80 },
    { text: 'Description', dataIndex: 'name', flex: 1 },
    { text: 'Disk usage...', dataIndex: 'disk', width: 90 },
    { text: 'Memory us...', dataIndex: 'memory', width: 90 },
    { text: 'CPU usage', dataIndex: 'cpu', width: 90 },
    { text: 'Uptime', dataIndex: 'uptime', width: 90 },
    { text: 'Host CPU...', dataIndex: 'hostCpu', width: 90 },
    { text: 'Host Mem...', dataIndex: 'hostMem', width: 90 },
    { text: 'Tags', dataIndex: 'tags', width: 180 },
  ];

  // Grid data matching screenshot exactly
  const gridData = [
    { type: 'lxc', name: '101 (backup-server)', disk: '26.7 %', memory: '13.3 %', cpu: '0.0 % of 2', uptime: '02:37:03', hostCpu: '0.0 % of 8', hostMem: '0.4 %', tags: ['backup', 'community-script'] },
    { type: 'lxc', name: '103 (smb-server)', disk: '25.4 %', memory: '34.8 %', cpu: '0.2 % of 2', uptime: '02:36:49', hostCpu: '0.0 % of 8', hostMem: '1.1 %', tags: [] },
    { type: 'lxc', name: '106 (vpnrouter-extra)', disk: '11.6 %', memory: '37.2 %', cpu: '0.2 % of 2', uptime: '02:36:49', hostCpu: '0.0 % of 8', hostMem: '0.6 %', tags: [] },
    { type: 'lxc', name: '200 (dns-server)', disk: '15.8 %', memory: '54.9 %', cpu: '0.0 % of 2', uptime: '02:37:03', hostCpu: '0.0 % of 8', hostMem: '3.6 %', tags: ['adblock', 'alpine', 'community-script'] },
    { type: 'lxc', name: '201 (linux)', disk: '45.6 %', memory: '18.0 %', cpu: '2.5 % of 24', uptime: '02:36:54', hostCpu: '0.6 % of 8', hostMem: '7.0 %', tags: [] },
    { type: 'zone', name: 'localnetwork (progsoft)', disk: '-', memory: '-', cpu: '-', uptime: '-', hostCpu: '-', hostMem: '-', tags: [] },
    { type: 'node', name: 'progsoft', disk: '32.9 %', memory: '78.5 %', cpu: '3.2 % of 8', uptime: '02:37:22', hostCpu: '-', hostMem: '-', tags: [] },
    { type: 'qemu', name: '100 (umbrelus)', disk: '0.0 %', memory: '52.8 %', cpu: '3.7 % of 4', uptime: '02:36:50', hostCpu: '1.8 % of 8', hostMem: '41.0 %', tags: ['community-script'] },
    { type: 'storage', name: 'local (progsoft)', disk: '32.9 %', memory: '-', cpu: '-', uptime: '-', hostCpu: '-', hostMem: '-', tags: [] },
    { type: 'storage', name: 'local-lvm (progsoft)', disk: '35.8 %', memory: '-', cpu: '-', uptime: '-', hostCpu: '-', hostMem: '-', tags: [] },
    { type: 'storage', name: 'pbs-container (progsoft)', disk: '16.4 %', memory: '-', cpu: '-', uptime: '-', hostCpu: '-', hostMem: '-', tags: [] },
  ];

  // Tasks grid columns (bottom South region)
  const taskColumns = [
    { text: 'Start Time', dataIndex: 'startTime', width: 140 },
    { text: 'End Time', dataIndex: 'endTime', width: 140 },
    { text: 'Node', dataIndex: 'node', width: 100 },
    { text: 'User name', dataIndex: 'user', width: 120 },
    { text: 'Description', dataIndex: 'desc', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 },
  ];

  // Tasks grid data matching screenshot exactly
  const taskData = [
    { startTime: 'Jul 04 14:24:22', endTime: 'Jul 04 14:47:29', node: 'progsoft', user: 'root@pam', desc: 'Shell', status: 'OK' },
    { startTime: 'Jul 04 14:22:16', endTime: 'Jul 04 14:22:17', node: 'progsoft', user: 'root@pam', desc: 'Shell', status: 'OK' },
    { startTime: 'Jul 04 14:21:45', endTime: 'Jul 04 14:47:25', node: 'progsoft', user: 'root@pam', desc: 'Shell', status: 'OK' },
    { startTime: 'Jul 04 14:15:57', endTime: 'Jul 04 14:16:03', node: 'progsoft', user: 'root@pam', desc: 'CT 103 - Start', status: 'OK' },
    { startTime: 'Jul 04 14:15:57', endTime: 'Jul 04 14:16:03', node: 'progsoft', user: 'root@pam', desc: 'CT 105 - Start', status: 'OK' },
  ];

  // Filter grid by search text
  const filteredGridData = gridData.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase()) || 
    item.type.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Viewport>
      {/* 1. North Region: Proxmox Header Bar */}
      <div className="pve-header">
        {headerLogo}
        <div className="pve-header-search-container">
          <input type="text" className="pve-header-search" placeholder="Search" />
        </div>
        <div className="pve-header-buttons">
          <button className="x-button" onClick={() => alert('Opening Documentation')}>
            📘 Documentation
          </button>
          <button className="x-button x-button-primary" onClick={() => setShowWindow(true)}>
            🖥️ Create VM
          </button>
          <button className="x-button x-button-primary" onClick={() => setShowWindow(true)}>
            📦 Create CT
          </button>
          <span style={{ fontSize: '11px', color: '#666', borderLeft: '1px solid #c8c8c8', paddingLeft: '8px', marginLeft: '4px' }}>
            👤 root@pam
          </span>
        </div>
      </div>

      {/* 2. Main Middle Workspace Layout */}
      <div className="x-border-layout">
        
        {/* West Sidebar: Resource Tree Navigation */}
        <Region region="west" width={220} style={{ borderRight: '1px solid #c8c8c8' }}>
          {/* Toolbar on top of tree */}
          <div className="x-toolbar" style={{ borderBottom: '1px solid #c8c8c8' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Server View</span>
            <span style={{ fontSize: '10px', color: '#666', cursor: 'pointer' }}>▼</span>
          </div>
          <Panel style={{ border: 'none' }}>
            <div style={{ padding: '5px' }}>
              {/* Resource Tree nodes */}
              <div className="pve-tree-item x-selected">
                <span>📁</span>
                <strong>Datacenter</strong>
              </div>
              <div className="pve-tree-item" style={{ marginLeft: '12px' }}>
                <span>🖥️</span>
                <span>progsoft</span>
              </div>
              {gridData.filter(i => i.type === 'lxc' || i.type === 'qemu').map(vm => (
                <div key={vm.name} className="pve-tree-item" style={{ marginLeft: '24px', opacity: vm.disk === '0.0%' ? 0.6 : 1 }}>
                  <span>{vm.type === 'lxc' ? '📦' : '🖥️'}</span>
                  <span style={{ fontSize: '11px' }}>{vm.name}</span>
                </div>
              ))}
            </div>
          </Panel>
        </Region>

        {/* Center Main Workspace Region */}
        <Region region="center" style={{ display: 'flex', flexDirection: 'row' }}>
          
          {/* Subnavigation Sidebar inside Center */}
          <div className="pve-subnav">
            {subnavItems.map(item => (
              <div 
                key={item.name} 
                className={`pve-subnav-item ${activeSubnav === item.name ? 'x-selected' : ''}`}
                onClick={() => setActiveSubnav(item.name)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Subnav Option Detail Area (Search is grid panel) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            {activeSubnav === 'Search' ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Search control toolbar */}
                <div className="x-toolbar" style={{ justifyContent: 'flex-end', padding: '3px 10px', borderBottom: '1px solid #c8c8c8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '11px' }}>Search:</span>
                    <input 
                      type="text" 
                      style={{ height: '20px', border: '1px solid #c8c8c8', padding: '2px 6px', fontSize: '11px', outline: 'none' }}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Datacenter Search Resource Grid */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(to bottom, #f9f9f9, #e9e9e9)', borderBottom: '1px solid #c8c8c8', height: '24px' }}>
                        {gridColumns.map(col => (
                          <th 
                            key={col.text} 
                            style={{ 
                              width: col.width || 'auto', 
                              borderRight: '1px solid #c8c8c8', 
                              textAlign: 'left', 
                              padding: '2px 6px', 
                              fontSize: '11px', 
                              fontWeight: 'bold',
                              color: '#333'
                            }}
                          >
                            {col.text}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGridData.map((row, index) => (
                        <tr 
                          key={index} 
                          className={selectedRow === index ? 'x-grid-row x-selected' : 'x-grid-row'}
                          onClick={() => setSelectedRow(index)}
                          style={{ height: '22px' }}
                        >
                          <td className="x-grid-cell">
                            <span style={{ marginRight: '5px' }}>
                              {row.type === 'lxc' ? '📦' : row.type === 'qemu' ? '🖥️' : row.type === 'storage' ? '💾' : '⚙️'}
                            </span>
                            {row.type}
                          </td>
                          <td className="x-grid-cell" style={{ fontWeight: 'bold' }}>{row.name}</td>
                          <td className="x-grid-cell">{row.disk}</td>
                          <td className="x-grid-cell">{row.memory}</td>
                          <td className="x-grid-cell">{row.cpu}</td>
                          <td className="x-grid-cell">{row.uptime}</td>
                          <td className="x-grid-cell">{row.hostCpu}</td>
                          <td className="x-grid-cell">{row.hostMem}</td>
                          <td className="x-grid-cell" style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                            {row.tags.map(tag => (
                              <span key={tag} className={`pve-tag pve-tag-${tag.includes('script') ? 'script' : tag}`}>
                                {tag}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px' }}>
                <h3>{activeSubnav} Detail Panel</h3>
                <p>This is a simulated panel for <strong>{activeSubnav}</strong>, demonstrating rich layouts typical of Proxmox VE.</p>
              </div>
            )}
          </div>
        </Region>
      </div>

      {/* 3. South Region: Task Log TabPanel */}
      <Region region="south" height={220} style={{ borderTop: '2px solid #c8c8c8' }}>
        <div className="x-tabpanel-south">
          <div className="x-tabpanel-bar">
            <div 
              className={`x-tabpanel-tab ${activeTabSouth === 'Tasks' ? 'x-active' : ''}`}
              onClick={() => setActiveTabSouth('Tasks')}
            >
              Tasks
            </div>
            <div 
              className={`x-tabpanel-tab ${activeTabSouth === 'ClusterLog' ? 'x-active' : ''}`}
              onClick={() => setActiveTabSouth('ClusterLog')}
            >
              Cluster log
            </div>
          </div>
          
          <div style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
            {activeTabSouth === 'Tasks' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', borderBottom: '1px solid #c8c8c8', height: '22px' }}>
                    {taskColumns.map(col => (
                      <th 
                        key={col.text} 
                        style={{ 
                          width: col.width || 'auto', 
                          borderRight: '1px solid #c8c8c8', 
                          textAlign: 'left', 
                          padding: '2px 6px', 
                          fontSize: '11px',
                          fontWeight: 'bold',
                          color: '#555' 
                        }}
                      >
                        {col.text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taskData.map((task, i) => (
                    <tr key={i} className="x-grid-row" style={{ height: '20px' }}>
                      <td className="x-grid-cell">{task.startTime}</td>
                      <td className="x-grid-cell">{task.endTime}</td>
                      <td className="x-grid-cell">{task.node}</td>
                      <td className="x-grid-cell">{task.user}</td>
                      <td className="x-grid-cell">{task.desc}</td>
                      <td className="x-grid-cell" style={{ color: 'green', fontWeight: 'bold' }}>{task.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '10px', fontSize: '11px', color: '#666' }}>
                No active cluster log items to show at this moment.
              </div>
            )}
          </div>
        </div>
      </Region>

      {/* 4. Draggable Wizard Window (Create VM) constrained inside Viewport */}
      {showWindow && (
        <Window 
          title="Create: Virtual Machine" 
          width={500} 
          height={340} 
          onClose={() => setShowWindow(false)}
          buttons={
            <>
              <Button text="Cancel" onClick={() => setShowWindow(false)} />
              <Button text="Back" onClick={() => {}} />
              <Button text="Next" onClick={() => {}} />
              <Button text="Finish" primary={true} onClick={() => {
                setShowWindow(false);
                alert('VM Deployment Scheduled!');
              }} />
            </>
          }
        >
          <div style={{ fontSize: '11px', borderBottom: '1px solid #c8c8c8', paddingBottom: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#ff6600', fontWeight: 'bold' }}>General</span> &gt; OS &gt; System &gt; Disks &gt; CPU &gt; Memory &gt; Network &gt; Confirm
          </div>
          <Form>
            <TextField label="Node" value="progsoft" onChange={() => {}} />
            <TextField label="VM ID" value="107" onChange={() => {}} />
            <TextField label="Name" value="web-server-test" onChange={() => {}} />
            <TextField label="Resource Pool" value="" onChange={() => {}} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '108px', marginTop: '10px' }}>
              <input type="checkbox" id="advanced-check" />
              <label htmlFor="advanced-check" style={{ fontSize: '11px', cursor: 'pointer' }}>Advanced Mode</label>
            </div>
          </Form>
        </Window>
      )}
    </Viewport>
  );
}

export default App;
