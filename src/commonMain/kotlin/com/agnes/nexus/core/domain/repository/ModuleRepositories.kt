package com.agnes.nexus.core.domain.repository

import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.ForgeProfile
import com.agnes.nexus.core.domain.models.LedgerProfile
import com.agnes.nexus.core.domain.models.ScoutKnowledge
import com.agnes.nexus.core.domain.models.SomaProfile
import com.agnes.nexus.core.domain.models.TherapyProfile
import com.agnes.nexus.core.domain.models.TrainerProfile

interface AgnesRepository  : ModuleRepository<TherapyProfile>
interface AtlasRepository  : ModuleRepository<AtlasProfile>
interface TitanRepository  : ModuleRepository<TrainerProfile>
interface SomaRepository   : ModuleRepository<SomaProfile>
interface LedgerRepository : ModuleRepository<LedgerProfile>
interface ScoutRepository  : ModuleRepository<ScoutKnowledge>
interface ForgeRepository  : ModuleRepository<ForgeProfile>
