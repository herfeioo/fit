import React, { useState, useMemo } from 'react';
import { Search, Filter, Play, Info, Layers, Plus, Dumbbell, ShieldAlert, Sparkles } from 'lucide-react';
import { Exercise, Language, TargetMuscle, MovementPattern, EquipmentType } from '../types';
import { translations } from '../translations';
import { getAllExercisesLibrary } from '../utils/aiMemoryEngine';

interface ExercisesTabProps {
  lang: Language;
  onOpenExerciseDetail: (exerciseId: string) => void;
  customGifs: Record<string, string>;
  onOpenAddExerciseModal?: () => void;
}

export const ExercisesTab: React.FC<ExercisesTabProps> = ({
  lang,
  onOpenExerciseDetail,
  customGifs,
  onOpenAddExerciseModal,
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');

  const allExercises = useMemo(() => {
    return getAllExercisesLibrary();
  }, []);

  const muscleFilters: { id: string; label: { en: string; fa: string } }[] = [
    { id: 'all', label: { en: 'All Muscles', fa: 'همه عضلات' } },
    { id: 'Chest', label: { en: 'Chest', fa: 'سینه' } },
    { id: 'Back', label: { en: 'Back', fa: 'پشت / زیربغل' } },
    { id: 'Shoulders', label: { en: 'Shoulders', fa: 'سرشانه' } },
    { id: 'Quads', label: { en: 'Quads', fa: 'چهارسر ران' } },
    { id: 'Hamstrings', label: { en: 'Hamstrings', fa: 'همسترینگ' } },
    { id: 'Glutes', label: { en: 'Glutes', fa: 'سرینی / باسن' } },
    { id: 'Arms', label: { en: 'Arms', fa: 'بازو' } },
    { id: 'Core', label: { en: 'Core', fa: 'شکم و میان‌تنه' } },
    { id: 'Calves', label: { en: 'Calves', fa: 'ساق پا' } },
  ];

  const patternFilters: { id: string; label: { en: string; fa: string } }[] = [
    { id: 'all', label: { en: 'All Patterns', fa: 'همه الگوها' } },
    { id: 'push', label: { en: 'Push (پرسی)', fa: 'Push (پرسی)' } },
    { id: 'pull', label: { en: 'Pull (کششی)', fa: 'Pull (کششی)' } },
    { id: 'squat', label: { en: 'Squat (اسکوات)', fa: 'Squat (اسکوات)' } },
    { id: 'hinge', label: { en: 'Hinge (لگن)', fa: 'Hinge (لگن)' } },
    { id: 'carry', label: { en: 'Carry / Core', fa: 'Carry / Core' } },
    { id: 'rotation', label: { en: 'Rotation', fa: 'Rotation (چرخشی)' } },
  ];

  const equipmentFilters: { id: string; label: { en: string; fa: string } }[] = [
    { id: 'all', label: { en: 'All Equipment', fa: 'همه تجهیزات' } },
    { id: 'barbell', label: { en: 'Barbell (هالتر)', fa: 'هالتر' } },
    { id: 'dumbbell', label: { en: 'Dumbbell (دمبل)', fa: 'دمبل' } },
    { id: 'cable', label: { en: 'Cable (سیم‌کش)', fa: 'سیم‌کش' } },
    { id: 'machine', label: { en: 'Machine (دستگاه)', fa: 'دستگاه' } },
    { id: 'bodyweight', label: { en: 'Bodyweight (وزن بدن)', fa: 'وزن بدن' } },
  ];

  const filteredExercises = useMemo(() => {
    return allExercises.filter((ex) => {
      // Muscle filter
      const matchesMuscle =
        selectedMuscle === 'all' ||
        (ex.muscleGroup && ex.muscleGroup.toLowerCase() === selectedMuscle.toLowerCase()) ||
        ex.targetMuscle.toLowerCase() === selectedMuscle.toLowerCase() ||
        ex.secondaryMuscles.some((m) => m.toLowerCase().includes(selectedMuscle.toLowerCase()));

      // Pattern filter
      const matchesPattern =
        selectedPattern === 'all' ||
        (ex.movementPattern && ex.movementPattern.toLowerCase() === selectedPattern.toLowerCase());

      // Equipment filter
      const matchesEquipment =
        selectedEquipment === 'all' ||
        (ex.equipment && ex.equipment.toLowerCase() === selectedEquipment.toLowerCase());

      // Search query (matches English name, Persian name, or target)
      const query = searchTerm.toLowerCase().trim();
      const matchesQuery =
        !query ||
        ex.name.en.toLowerCase().includes(query) ||
        ex.name.fa.includes(query) ||
        ex.targetMuscle.toLowerCase().includes(query);

      return matchesMuscle && matchesPattern && matchesEquipment && matchesQuery;
    });
  }, [allExercises, searchTerm, selectedMuscle, selectedPattern, selectedEquipment]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
      {/* Header & Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              NASM / ACSM Ontology
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {allExercises.length} {lang === 'fa' ? 'حرکت در سامانه' : 'exercises in library'}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
            {t.exerciseLibraryTitle}
          </h1>
          <p className="text-xs text-slate-400">
            {lang === 'fa'
              ? 'پایگاه خودگسترش‌شونده تمرینات بر مبنای بیومکانیک و علوم ورزشی'
              : 'Self-expanding exercise library with biomechanical progression models'}
          </p>
        </div>

        {onOpenAddExerciseModal && (
          <button
            id="add-custom-exercise-btn"
            onClick={onOpenAddExerciseModal}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'fa' ? 'افزودن حرکت جدید' : 'Add Exercise'}</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.searchExercise}
          className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none placeholder:text-slate-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Horizontal Filter Scrolls */}
      <div className="space-y-2">
        {/* Muscle Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {muscleFilters.map((filter) => {
            const isActive = selectedMuscle === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedMuscle(filter.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {filter.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Movement Pattern Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar text-[11px]">
          {patternFilters.map((filter) => {
            const isActive = selectedPattern === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedPattern(filter.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {filter.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Equipment Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar text-[11px]">
          {equipmentFilters.map((filter) => {
            const isActive = selectedEquipment === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedEquipment(filter.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {filter.label[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredExercises.map((exercise) => {
            const visualUrl = customGifs[exercise.id] || exercise.customGifUrl || exercise.gifUrl;
            return (
              <div
                key={exercise.id}
                onClick={() => onOpenExerciseDetail(exercise.id)}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer flex gap-3.5 items-center group relative overflow-hidden"
              >
                {/* Visual Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 relative">
                  <img
                    src={visualUrl}
                    alt={exercise.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {exercise.muscleGroup || exercise.targetMuscle}
                    </span>
                    {exercise.movementPattern && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {exercise.movementPattern}
                      </span>
                    )}
                    {exercise.type && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-slate-800 text-slate-300">
                        {exercise.type}
                      </span>
                    )}
                    {exercise.isCustom && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                        Custom
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-200 text-xs sm:text-sm truncate group-hover:text-emerald-300 transition-colors">
                    {exercise.name[lang]}
                  </h3>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span>
                      {exercise.defaultSets} {lang === 'fa' ? 'ست' : 'sets'} × {exercise.defaultReps}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{exercise.equipment || 'Gym'}</span>
                    {exercise.injuryRiskLevel && (
                      <>
                        <span>•</span>
                        <span className={
                          exercise.injuryRiskLevel === 'high'
                            ? 'text-rose-400'
                            : exercise.injuryRiskLevel === 'medium'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }>
                          {exercise.injuryRiskLevel} risk
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-500 space-y-2">
          <Dumbbell className="w-8 h-8 mx-auto text-slate-600" />
          <p>{t.noExercisesFound}</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedMuscle('all');
              setSelectedPattern('all');
              setSelectedEquipment('all');
            }}
            className="text-xs text-emerald-400 hover:underline cursor-pointer"
          >
            {lang === 'fa' ? 'پاک کردن فیلترها' : 'Clear filters'}
          </button>
        </div>
      )}
    </div>
  );
};
