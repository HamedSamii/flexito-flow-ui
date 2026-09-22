// fx-channels.js — Flexito channel-detail pages (WhatsApp Cloud, Facebook, Telegram, etc.)
// Injects CSS at runtime so :has() works (native browser support), bypassing the Custom CSS field's older parser.
// Load alongside fx-flow.js with a second <script src="..."> tag in the HTML Script add-on.
!function(){
  if(window.__fxChan1){return}window.__fxChan1=1;
  var css=`
/* === OmniAI 360 page v2 — launcher style (scoped away from channel-detail pages) === */
#team-main .p-3:not(:has(.el-button--danger)){padding:64px 48px!important}
#team-main .p-3>div:not(:has(.el-button--danger)){max-width:none!important;margin:0!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card .el-card__body,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card .el-card__header,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card .card-body,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card .table-responsive,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card table,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card tbody{background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important}

#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(1){display:flex!important;flex-direction:column;align-items:center;text-align:center;margin-bottom:72px!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(1) i{display:none!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(1) .el-card__header{font-size:56px;font-weight:800;letter-spacing:-.03em;line-height:1;padding-bottom:16px!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(1) .card-body>div{display:flex;flex-direction:column;align-items:center;gap:32px}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(1) .mb-3{margin:0!important;max-width:520px;font-size:18px;line-height:1.7;opacity:.6}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(1) .el-button{width:min(420px,100%);padding:18px 32px!important;font-size:16px;letter-spacing:.02em}

#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) .el-card__body:before{content:"CHANNELS";display:block;text-align:center;margin-bottom:48px;font-size:12px;font-weight:700;letter-spacing:.25em;opacity:.5;background:linear-gradient(currentColor,currentColor) left center/calc(50% - 70px) 1px no-repeat,linear-gradient(currentColor,currentColor) right center/calc(50% - 70px) 1px no-repeat}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) table{display:block;width:100%}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) thead{display:none}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) tbody{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:56px 24px}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) tbody tr{display:flex;flex-direction:column;align-items:center;text-align:center;animation:fx .5s both}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td{display:block;width:100%!important;padding:0!important;border:0!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td:nth-child(1)>div{display:flex;flex-direction:column;align-items:center;gap:18px;font-size:16px;font-weight:700}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td:nth-child(1) .svg-icon{display:block;width:88px;height:88px;margin:0!important;background-size:44px;background-repeat:no-repeat;background-position:center;background-color:rgba(128,128,128,.1);border-radius:50%;box-shadow:0 0 0 8px rgba(128,128,128,.06);transition:transform .25s}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) tbody tr:hover .svg-icon{transform:translateY(-6px) scale(1.06)}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td:nth-child(2){margin-top:6px;min-height:18px;font-size:12px;opacity:.55;word-break:break-word}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td:nth-child(3){margin-top:16px}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td:nth-child(3)>div{text-align:center!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) td:nth-child(3) .el-button{min-width:120px;padding:9px 22px}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) .pro-badge,
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card:nth-child(2) .el-button i{display:none!important}
#team-main .p-3>div:not(:has(.el-button--danger))>.content-card .el-button{border-radius:999px!important;font-weight:600}
@keyframes fx{from{opacity:0;transform:translateY(12px)}}


/* === Channel detail pages (WhatsApp Cloud, Facebook, Telegram, etc.) — Flexito card look === */

/* 1. Header row: icon+title left, Disconnect far right, nudged down */
#team-main .p-3>div:has(.el-button--danger) .el-card__header{padding:20px 24px!important;border-bottom:1px solid #F0F3F8!important}
#team-main .p-3>div:has(.el-button--danger) .el-card__header>div{display:flex!important;align-items:center!important;flex-wrap:nowrap!important;gap:10px!important;text-align:start!important}
#team-main .p-3>div:has(.el-button--danger) .el-card__header>div>.pull-right{order:1!important;margin:4px 0 0 auto!important;flex:0 0 auto!important}
#team-main .p-3>div:has(.el-button--danger) .el-button--danger.is-plain{border-radius:999px!important;font-weight:600!important;padding:8px 16px!important}

/* 2. Business info block (name/id + Add Number/Sync Numbers row) */
#team-main .p-3>div:has(.el-button--danger) .card-body{padding:24px!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .el-row.el-row--flex{display:flex!important;flex-wrap:wrap!important;margin:0!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .el-col-10{width:auto!important;max-width:100%!important;flex:0 0 auto!important;padding:0!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .text-muted.font-smaller{margin:0 0 2px!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .text-muted.font-smaller.mt-2{margin-top:16px!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .blur-text{font-size:14px!important;font-weight:600!important;color:#0A0E1A!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .mt-2:last-child{display:flex!important;flex-wrap:nowrap!important;gap:10px!important;margin-top:20px!important;white-space:nowrap!important}
#team-main .p-3>div:has(.el-button--danger) .card-body .mt-2:last-child .el-button{margin-right:0!important;white-space:nowrap!important;border-radius:999px!important;font-weight:600!important;padding:9px 18px!important}

/* 3. CHANNELS table — reset leaked launcher-grid layout back to a real table, all columns centered */
#team-main .p-3>div:has(.el-button--danger) .content-card table{display:table!important;width:100%!important;border-collapse:separate!important;border-spacing:0 10px!important}
#team-main .p-3>div:has(.el-button--danger) .content-card thead{display:table-header-group!important}
#team-main .p-3>div:has(.el-button--danger) .content-card thead tr{display:table-row!important}
#team-main .p-3>div:has(.el-button--danger) .content-card thead th{display:table-cell!important;width:auto!important;padding:0 14px 8px!important;font-size:10px!important;font-weight:700!important;letter-spacing:.06em;text-transform:uppercase;color:#8B93A1!important;text-align:center!important;border:0!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody{display:table-row-group!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody tr{display:table-row!important;animation:none!important;background:#F9FAFC!important;box-shadow:0 0 0 1px #EEF1F6!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody tr:hover{background:#F3FBF8!important;transform:none!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody td{display:table-cell!important;width:auto!important;text-align:center!important;padding:14px!important;vertical-align:middle!important;border:0!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody td:first-child{border-radius:14px 0 0 14px!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody td:last-child{border-radius:0 14px 14px 0!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody td>div{text-align:center!important}
#team-main .p-3>div:has(.el-button--danger) .content-card tbody td .text-muted.font-small{text-align:center!important}
#team-main .p-3>div:has(.el-button--danger) .content-card .svg-icon{width:16px!important;height:16px!important;border-radius:0!important;background-color:transparent!important;box-shadow:none!important;transform:none!important;display:inline-block!important}

/* 4. Status pills: Active / ONBOARDED / Enabled — mint success */
#team-main .p-3>div:has(.el-button--danger) .el-button--success{background:#E7FBF6!important;border-color:#BEEFE0!important;color:#057A5E!important;border-radius:999px!important;font-weight:700!important;font-size:11px!important;box-shadow:none!important;padding:6px 14px!important}
#team-main .p-3>div:has(.el-button--danger) .badge-success{background:#E7FBF6!important;color:#057A5E!important;border:1px solid #BEEFE0!important;border-radius:999px!important;padding:4px 10px!important;font-weight:700!important;font-size:11px!important;display:inline-block!important}

/* 5. MM Lite Status column (4th): ONBOARDED badge or Check Status button — forced true centering */
#team-main .p-3>div:has(.el-button--danger) .content-card table tbody td:nth-child(4){display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important}
#team-main .p-3>div:has(.el-button--danger) .content-card table tbody td:nth-child(4)>div{display:flex!important;justify-content:center!important;width:100%!important}

/* 6. "Check Status" button — text pill, NOT squeezed into a 32px circle */
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-button--default:not(.el-tooltip){border-radius:999px!important;width:auto!important;height:auto!important;min-width:auto!important;padding:7px 16px!important;border-color:#E6EAF2!important;background:#F7F9FB!important;color:#5B6472!important;font-weight:600!important;font-size:12px!important;box-shadow:none!important}
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-button--default:not(.el-tooltip):hover{background:#EEF2F6!important;border-color:#D7DEEA!important}

/* 7. "Open" primary pill + channel label under it */
#team-main .p-3>div:has(.el-button--danger) .el-button--primary.is-plain{border-radius:999px!important;padding:7px 16px!important;font-weight:600!important;font-size:12px!important}
#team-main .p-3>div:has(.el-button--danger) .font-smaller.mt-2{color:#5B6472!important;font-size:11px!important;margin-top:6px!important;display:block!important;text-align:center!important}

/* 8. Icon-only round buttons: unlink, phone, ⋮ ellipsis */
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-button--default.el-tooltip,
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-dropdown-selfdefine{border-radius:999px!important;width:32px!important;height:32px!important;min-width:32px!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;border-color:#E6EAF2!important;background:#fff!important;box-shadow:none!important;vertical-align:middle!important}
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-button--default.el-tooltip span,
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-dropdown-selfdefine span{display:inline-flex!important;align-items:center!important;justify-content:center!important;line-height:1!important}
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-button--default.el-tooltip i,
#team-main .p-3>div:has(.el-button--danger) .content-card table .el-dropdown-selfdefine i{color:#5B6472!important;font-size:14px!important;line-height:1!important;font-family:"FontAwesome","Font Awesome 5 Free","Font Awesome 6 Free",sans-serif!important;font-weight:900!important;font-style:normal!important;display:inline-block!important;opacity:1!important;visibility:visible!important}

/* 9. WhatsApp Bot column (5th): [Open][unlink] row centered, label centered under it */
#team-main .p-3>div:has(.el-button--danger) .content-card table tbody td:nth-child(5)>div{display:flex!important;flex-direction:column!important;align-items:center!important;gap:8px!important}
#team-main .p-3>div:has(.el-button--danger) .content-card table tbody td:nth-child(5)>div>div:first-child{display:flex!important;align-items:center!important;justify-content:center!important;gap:14px!important}

/* 10. WhatsApp Calls column (6th): phone icon + Enabled badge, stacked & centered */
#team-main .p-3>div:has(.el-button--danger) .content-card table tbody td:nth-child(6){display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:8px!important}
  `;
  var tag=document.createElement('style');
  tag.id='fx-channels-style';
  tag.textContent=css;
  document.head.appendChild(tag);
}();
